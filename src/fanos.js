// Fanos.js
import { config } from './config.js'

import { debounce, debugLog } from './utils.js'
import { RequestHandler } from './requestHandler.js'

export class Fanos {
  static defaults = config
  static instance = new Fanos()

  constructor(options = {}) {
    this.config = { ...Fanos.defaults, ...options }
    this.queue = new Set()
    this.abortController = new AbortController()
    this.requestHandler = new RequestHandler(this.config, this.queue)
    this.retryTimer = null
    this._initialized = false
  }

  static send(data, options) {
    return Fanos.instance.send(data, options)
  }

  static configure(options) {
    Object.assign(Fanos.instance.config, options)
    return Fanos.instance
  }

  static flush() {
    Fanos.instance?.flush()
  }

  static destroy() {
    Fanos.instance?.destroy()
  }

  send(data, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this._initialized) this._initialize()

      const request = this.requestHandler.createRequest(data, options)
      debugLog(this.config.debug, 'Sending request:', { request })

      try {
        const success = this.requestHandler.sendRequest(request)
        success ? resolve() : this._handleFailure(request, reject)
      } catch (error) {
        this._handleFailure(request, reject, error)
      }
    })
  }

  flush() {
    if (this.queue.size === 0) {
      debugLog(this.config.debug, 'Queue is empty, skipping flush.')
      return
    }

    debugLog(this.config.debug, `Flushing queue with ${this.queue.size} items`)
    const successfulRequests = new Set()
    const maxRetry = this.config.maxAttemptsPerRequest

    for (const request of this.queue) {
      if (request.attempts >= maxRetry) continue
      try {
        if (this.requestHandler.sendRequest(request))
          successfulRequests.add(request.id)
      } catch (error) {
        debugLog(this.config.debug, 'Flush error:', error)
      }
    }

    this.queue.forEach((request) => {
      if (successfulRequests.has(request.id) || request.attempts >= maxRetry) {
        this.queue.delete(request)
      }
    })

    if (this.queue.size > 0) {
      this._persistQueue()
    } else if (this.config.debug) {
      debugLog(this.config.debug, 'Queue is empty, skipping persistence.')
    }
  }

  destroy() {
    debugLog(this.config.debug, 'Destroying instance')
    this.abortController.abort()
    clearTimeout(this.retryTimer)
    this.queue.clear()
    this._persistQueue()
    this._initialized = false
  }

  _initialize() {
    debugLog(this.config.debug, 'Initializing...')
    this._loadQueue()
    this._eventHandler()
    this._scheduleRetries()
    this._initialized = true
  }

  _handleFailure(request, reject, error = new Error('Beacon failed')) {
    request.attempts++
    debugLog(
      this.config.debug,
      `Request ${request.id} failed (attempt ${request.attempts})`,
    )

    if (this.config.storeFailed) {
      this.queue.add(request)
      this._persistQueue()
    }

    reject(error)
  }

  _scheduleRetries(attempt = 1) {
    if (this.retryTimer) clearTimeout(this.retryTimer)

    if (this.queue.size === 0) {
      debugLog(this.config.debug, 'Queue is empty, stopping retries.')
      return
    }

    const maxRetryCycles = this.config.maxRetryCycles || 10
    if (attempt > maxRetryCycles) {
      debugLog(
        this.config.debug,
        'Max retry attempts reached, stopping retries.',
      )
      return
    }

    const maxDelay = this.config.maxRetryDelay || 300000
    const delay = Math.min(
      this.config.retryInterval * 2 ** (attempt - 1),
      maxDelay,
    )

    this.retryTimer = setTimeout(() => {
      this.flush()
      this._scheduleRetries(attempt + 1)
    }, delay)
  }

  _eventHandler() {
    if (!this.config.autoFlush) return

    this.abortController.abort()
    this.abortController = new AbortController()

    const handler = () => {
      if (this.queue.size > 0) {
        debugLog(this.config.debug, 'Auto-flushing queue due to unload event.')
        this.flush()
      } else if (this.config.debug) {
        debugLog(this.config.debug, 'Queue is empty, skipping auto-flush.')
      }
    }

    const { signal } = this.abortController

    ;['pagehide', 'beforeunload', 'visibilitychange'].forEach((event) => {
      window.addEventListener(event, handler, { signal })
    })
  }

  _loadQueue() {
    try {
      const stored = localStorage.getItem(this.config.storeKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          this.queue = new Set(parsed)
          debugLog(
            this.config.debug,
            `Loaded queue from storage: ${parsed.length} items`,
          )
        }
      }
    } catch (error) {
      debugLog(this.config.debug, 'Error loading queue:', error)
      this.queue.clear()
    }
  }

  _persistQueue = debounce(() => {
    if (!this.config.storeFailed || this.queue.size === 0) {
      if (this.config.debug) {
        debugLog(
          this.config.debug,
          'Skipping persistence: queue is empty or storeFailed is false.',
        )
      }
      return
    }

    try {
      const serialized = JSON.stringify(
        [...Array.from(this.queue)].slice(0, 100),
      )
      localStorage.setItem(this.config.storeKey, serialized)
      debugLog(this.config.debug, `Persisted queue: ${this.queue.size} items`)
    } catch (error) {
      debugLog(this.config.debug, 'Persist error:', error)
    }
  }, 500)
}
