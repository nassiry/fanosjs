import { debugLog } from './utils.js'

export const randomUUID = (debug) => {
  try {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID()
    }
  } catch (e) {
    debugLog(
      debug,
      'crypto.randomUUID() failed, falling back to alternative method',
      e,
    )
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
