/**
 * Copyright 2025 A.S Nassiry
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/nassiry/fanosjs
 */
const config = Object.freeze({
  url: null,
  headers: { 'Content-Type': 'application/json' },
  storeKey: '__FANOS__',
  autoFlush: true,
  storeFailed: true,
  debug: false,
  retryInterval: 5000,
  maxPayloadSize: 64000,
  maxAttemptsPerRequest: 3,
  maxRetryCycles: 10,
  maxRetryDelay: 300000,
  fallbackToFetch: false,
});

const normalizePayload = (data, headers) => {
  if (
    data instanceof Blob ||
    data instanceof FormData ||
    data instanceof URLSearchParams
  ) {
    return data
  }
  return new Blob([JSON.stringify(data)], { type: headers['Content-Type'] })
};

const createPayload = (data, headers) => normalizePayload(data, headers);

const getPayloadSize = (payload) => {
  if (payload instanceof Blob) return payload.size
  if (payload instanceof FormData) {
    return [...payload.entries()].reduce(
      (size, [key, value]) =>
        size + key.length + (typeof value === 'string' ? value.length : 0),
      0,
    )
  }
  if (payload instanceof URLSearchParams) {
    return new TextEncoder().encode(payload.toString()).length
  }
  return new TextEncoder().encode(JSON.stringify(payload)).length
};

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  }
}

const debugLog = (debug, ...args) => {
  if (debug === true || debug === 'info') {
    console.debug('[Fanos]', ...args);
  }
};

const randomUUID = (debug) => {
  try {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID()
    }
  } catch (e) {
    debugLog(
      debug,
      'crypto.randomUUID() failed, falling back to alternative method',
      e,
    );
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16)
  })
};

class RequestHandler {
  constructor(config, queue) {
    this._config = config;
    this._queue = queue;
  }

  sendRequest(request) {
    const payload = createPayload(request.data, request.headers);
    const payloadSize = getPayloadSize(payload);

    if (payloadSize > this._config.maxPayloadSize) {
      debugLog(this._config.debug, 'Warning: Payload too large, splitting...');
      return this.splitAndSend(request)
    }

    const success = navigator.sendBeacon(request.url, payload);
    if (success) {
      debugLog(this._config.debug, 'Beacon succeeded:', request.id);
      this._queue.delete(request);
      return true
    }

    if (this._config.fallbackToFetch) {
      return this.fetchFallback(request)
    }

    return false
  }
  createRequest(data, options) {
    return {
      id: randomUUID(this._config.debug),
      url: options.url || this._config.url,
      headers: { ...this._config.headers, ...options.headers },
      data,
      attempts: 0,
      timestamp: Date.now(),
    }
  }

  async splitAndSend(request) {
    debugLog(this._config.debug, `Splitting large request: ${request.id}`);

    const payload = normalizePayload(request.data, request.headers);
    const payloadStr =
      payload instanceof Blob
        ? await payload.text()
        : JSON.stringify(request.data);
    const chunkSize = this._config.maxPayloadSize - 1000;
    const chunks = [];

    for (let i = 0; i < payloadStr.length; i += chunkSize) {
      chunks.push(payloadStr.slice(i, i + chunkSize));
    }

    let allSent = true;
    chunks.forEach((chunk, index) => {
      const chunkBlob = new Blob([chunk], {
        type: request.headers['Content-Type'],
      });
      const success = navigator.sendBeacon(request.url, chunkBlob);
      if (!success) {
        debugLog(this._config.debug, `Chunk ${index + 1} failed to send`);
        allSent = false;
      }
    });

    if (allSent) {
      this._queue.delete(request);
    }

    return allSent
  }

  async fetchFallback(request) {
    try {
      const response = await fetch(request.url, {
        method: 'POST',
        headers: request.headers,
        body: createPayload(request.data, request.headers),
        keepalive: true,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      debugLog(this._config.debug, 'Fetch fallback succeeded:', request.id);
      this._queue.delete(request);
      return true
    } catch (error) {
      debugLog(this._config.debug, 'Fetch fallback failed:', error);
      return false
    }
  }
}

// Fanos.js

class Fanos {
  static defaults = config
  static instance = new Fanos()

  constructor(options = {}) {
    this.config = { ...Fanos.defaults, ...options };
    this.queue = new Set();
    this.abortController = new AbortController();
    this.requestHandler = new RequestHandler(this.config, this.queue);
    this.retryTimer = null;
    this._initialized = false;
  }

  static send(data, options) {
    return Fanos.instance.send(data, options)
  }

  static configure(options) {
    Object.assign(Fanos.instance.config, options);
    return Fanos.instance
  }

  static flush() {
    Fanos.instance?.flush();
  }

  static destroy() {
    Fanos.instance?.destroy();
  }

  send(data, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this._initialized) this._initialize();

      const request = this.requestHandler.createRequest(data, options);
      debugLog(this.config.debug, 'Sending request:', { request });

      try {
        const success = this.requestHandler.sendRequest(request);
        success ? resolve() : this._handleFailure(request, reject);
      } catch (error) {
        this._handleFailure(request, reject, error);
      }
    })
  }

  flush() {
    if (this.queue.size === 0) {
      debugLog(this.config.debug, 'Queue is empty, skipping flush.');
      return
    }

    debugLog(this.config.debug, `Flushing queue with ${this.queue.size} items`);
    const successfulRequests = new Set();
    const maxRetry = this.config.maxAttemptsPerRequest;

    for (const request of this.queue) {
      if (request.attempts >= maxRetry) continue
      try {
        if (this.requestHandler.sendRequest(request))
          successfulRequests.add(request.id);
      } catch (error) {
        debugLog(this.config.debug, 'Flush error:', error);
      }
    }

    this.queue.forEach((request) => {
      if (successfulRequests.has(request.id) || request.attempts >= maxRetry) {
        this.queue.delete(request);
      }
    });

    if (this.queue.size > 0) {
      this._persistQueue();
    } else if (this.config.debug) {
      debugLog(this.config.debug, 'Queue is empty, skipping persistence.');
    }
  }

  destroy() {
    debugLog(this.config.debug, 'Destroying instance');
    this.abortController.abort();
    clearTimeout(this.retryTimer);
    this.queue.clear();
    this._persistQueue();
    this._initialized = false;
  }

  _initialize() {
    debugLog(this.config.debug, 'Initializing...');
    this._loadQueue();
    this._eventHandler();
    this._scheduleRetries();
    this._initialized = true;
  }

  _handleFailure(request, reject, error = new Error('Beacon failed')) {
    request.attempts++;
    debugLog(
      this.config.debug,
      `Request ${request.id} failed (attempt ${request.attempts})`,
    );

    if (this.config.storeFailed) {
      this.queue.add(request);
      this._persistQueue();
    }

    reject(error);
  }

  _scheduleRetries(attempt = 1) {
    if (this.retryTimer) clearTimeout(this.retryTimer);

    if (this.queue.size === 0) {
      debugLog(this.config.debug, 'Queue is empty, stopping retries.');
      return
    }

    const maxRetryCycles = this.config.maxRetryCycles || 10;
    if (attempt > maxRetryCycles) {
      debugLog(
        this.config.debug,
        'Max retry attempts reached, stopping retries.',
      );
      return
    }

    const maxDelay = this.config.maxRetryDelay || 300000;
    const delay = Math.min(
      this.config.retryInterval * 2 ** (attempt - 1),
      maxDelay,
    );

    this.retryTimer = setTimeout(() => {
      this.flush();
      this._scheduleRetries(attempt + 1);
    }, delay);
  }

  _eventHandler() {
    if (!this.config.autoFlush) return

    this.abortController.abort();
    this.abortController = new AbortController();

    const handler = () => {
      if (this.queue.size > 0) {
        debugLog(this.config.debug, 'Auto-flushing queue due to unload event.');
        this.flush();
      } else if (this.config.debug) {
        debugLog(this.config.debug, 'Queue is empty, skipping auto-flush.');
      }
    };

    const { signal } = this.abortController

    ;['pagehide', 'beforeunload', 'visibilitychange'].forEach((event) => {
      window.addEventListener(event, handler, { signal });
    });
  }

  _loadQueue() {
    try {
      const stored = localStorage.getItem(this.config.storeKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.queue = new Set(parsed);
          debugLog(
            this.config.debug,
            `Loaded queue from storage: ${parsed.length} items`,
          );
        }
      }
    } catch (error) {
      debugLog(this.config.debug, 'Error loading queue:', error);
      this.queue.clear();
    }
  }

  _persistQueue = debounce(() => {
    if (!this.config.storeFailed || this.queue.size === 0) {
      if (this.config.debug) {
        debugLog(
          this.config.debug,
          'Skipping persistence: queue is empty or storeFailed is false.',
        );
      }
      return
    }

    try {
      const serialized = JSON.stringify(
        [...Array.from(this.queue)].slice(0, 100),
      );
      localStorage.setItem(this.config.storeKey, serialized);
      debugLog(this.config.debug, `Persisted queue: ${this.queue.size} items`);
    } catch (error) {
      debugLog(this.config.debug, 'Persist error:', error);
    }
  }, 500)
}

export { Fanos as default };
//# sourceMappingURL=fanos.esm.js.map
