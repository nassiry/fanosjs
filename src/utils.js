export const normalizePayload = (data, headers) => {
  if (
    data instanceof Blob ||
    data instanceof FormData ||
    data instanceof URLSearchParams
  ) {
    return data
  }
  return new Blob([JSON.stringify(data)], { type: headers['Content-Type'] })
}

export const createPayload = (data, headers) => normalizePayload(data, headers)

export const getPayloadSize = (payload) => {
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
}

export function debounce(fn, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

export const debugLog = (debug, ...args) => {
  if (debug === true || debug === 'info') {
    console.debug('[Fanos]', ...args)
  }
}
