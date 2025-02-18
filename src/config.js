export const config = Object.freeze({
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
})
