import {
  createPayload,
  debugLog,
  getPayloadSize,
  normalizePayload
} from './utils.js'

import { randomUUID } from './randomUUID.js'

export class RequestHandler {
  constructor(config, queue) {
    this._config = config
    this._queue = queue
  }

  sendRequest(request) {
    const payload = createPayload(request.data, request.headers)
    const payloadSize = getPayloadSize(payload)

    if (payloadSize > this._config.maxPayloadSize) {
      debugLog(this._config.debug, 'Warning: Payload too large, splitting...')
      return this.splitAndSend(request)
    }

    const success = navigator.sendBeacon(request.url, payload)
    if (success) {
      debugLog(this._config.debug, 'Beacon succeeded:', request.id)
      this._queue.delete(request)
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
    debugLog(this._config.debug, `Splitting large request: ${request.id}`)

    const payload = normalizePayload(request.data, request.headers)
    const payloadStr =
      payload instanceof Blob
        ? await payload.text()
        : JSON.stringify(request.data)
    const chunkSize = this._config.maxPayloadSize - 1000
    const chunks = []

    for (let i = 0; i < payloadStr.length; i += chunkSize) {
      chunks.push(payloadStr.slice(i, i + chunkSize))
    }

    let allSent = true
    chunks.forEach((chunk, index) => {
      const chunkBlob = new Blob([chunk], {
        type: request.headers['Content-Type'],
      })
      const success = navigator.sendBeacon(request.url, chunkBlob)
      if (!success) {
        debugLog(this._config.debug, `Chunk ${index + 1} failed to send`)
        allSent = false
      }
    })

    if (allSent) {
      this._queue.delete(request)
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
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      debugLog(this._config.debug, 'Fetch fallback succeeded:', request.id)
      this._queue.delete(request)
      return true
    } catch (error) {
      debugLog(this._config.debug, 'Fetch fallback failed:', error)
      if (error.name === 'TypeError') {
        debugLog(this._config.debug, 'Network error detected.');
      } else {
        debugLog(this._config.debug, 'HTTP error detected.');
      }
      return false;
    }
  }
}
