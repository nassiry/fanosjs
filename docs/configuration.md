# Configuration Options

The following options can be passed to `Fanos.configure(options)` or **when creating a new instance**.

## Table Of Contents

1. [Default Configurations](#1-default-configurations)
2. [Full Example](#2-full-example)
3. [Important Notes](#3-important-notes)

## 1. Default Configurations

| Option              | Type       | Default | Description                                                                |
| ------------------- | ---------- | ------- | -------------------------------------------------------------------------- |
| `url`         | `string`   | null       | The endpoint URL for sending data. **Required**.                                  |
| `headers`          | `Object`   | `{ 'Content-Type': 'application/json' }`    | Custom headers to include in requests. |
| `storeKey`           | `string`   | `__FANOS__`  | LocalStorage key for storing failed requests.                |
| `autoFlush`           | `boolean`   | `true`  | Automatically flush the queue on page unload.                      |
| `storeFailed`       | `boolean`   | `true`  | Saves failed requests in localStorage for retrying later.    |
| `debug`       | `boolean`  | `false` | Enables debug logs for troubleshooting.                                          |
| `retryInterval`       | `number`  | 5000 | Delay (in milliseconds) between retry attempts.                |
| `maxPayloadSize` | `number`   | 64000      | Maximum payload size in bytes.                                |
| `maxAttemptsPerRequest`           | `number`   | 3    | Maximum number of attempts for a single request before it's marked as failed.                                     |
| `maxRetryCycles`            | `number` | 10  | Maximum number of retry cycles for the entire queue.                           |
| `maxRetryDelay`            | `number` | `300000`  | Maximum delay (in milliseconds) between retries.                                  |
| `fallbackToFetch`             | `boolean`  | `false` | Falls back to the `Fetch API` if `Beacon API` fails (useful for older browsers).                                              |

## 2. Full Example

```javascript
// Configure the global Fanos instance
Fanos.configure({
    url: 'https://example.com/api/log', // Required API endpoint

    // Custom Headers
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'  // Default header, can be overridden
    },

    // Retry & Storage Behavior
    maxAttemptsPerRequest: 3, // Each request retries up to 3 times before failing
    maxRetryCycles: 5,        // The queue retries failed requests up to 5 times
    retryInterval: 2000,      // Wait 2 seconds between retries
    maxRetryDelay: 300000,    // Maximum wait time before retrying (5 minutes)
    storeFailed: true,        // Store failed requests in localStorage for retrying later
    storeKey: 'custom_key',   // Custom key for storing failed requests in localStorage

    // Performance & Reliability
    maxPayloadSize: 64000,    // Payload cannot exceed 64 KB
    fallbackToFetch: true,    // If `sendBeacon` fails, fallback to Fetch API
    autoFlush: true,          // Flush the queue automatically on page unload

    // Debugging
    debug: true,              // Enable debug mode to log internal processes
});

// Send a JSON payload
Fanos.send({ event: 'click', timestamp: Date.now() })
    .then(() => console.log('Sent successfully'))
    .catch(err => console.error('Failed to send:', err));

// Manually flush the queue (force retry of stored requests)
Fanos.flush();

// Destroy the global instance (clean up resources)
Fanos.destroy();
```

## 3. Important Notes

- **Payload Limitations**: The Beacon API **only supports requests up to 64KB**. If exceeded, **Fanos** automatically splits large payloads into smaller chunks.
- **Retry Handling**: If `maxRetryCycles` is reached, **Fanos will stop retrying**, and failed requests remain in `localStorage`.
- **Auto Flush Behavior**: When `autoFlush: true,` **queued requests are sent before the user leaves the page** (but not guaranteed if the browser is closed suddenly).
- **Fallback Mechanism**: When `fallbackToFetch: true,` requests will use `Fetch API` only if the `Beacon API` fails.
- **Default Headers**: By default, **Fanos** sets `{ 'Content-Type': 'application/json' }`. If you need to send other formats like `FormData`, override the `Content-Type` header accordingly.