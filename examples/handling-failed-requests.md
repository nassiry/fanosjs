# Handling Failed Requests

When a request fails due to network issues or server unavailability, **Fanos** automatically queues it for retry based on the configured settings. This ensures **reliable delivery** even in unstable conditions.

- **Automatic Retries**: If a request fails, it will retry up to `maxAttemptsPerRequest` times.
- **Queued Storage**: If retries fail, the request is stored in **localStorage** (`storeKey`) for later retry.
- **Background Recovery**: On the next page load or manual `flush()`, queued requests are retried.

```javascript
// Configure the global instance for reliable request handling
Fanos.configure({
    url: 'https://example.com/api/log',
    maxAttemptsPerRequest: 3, // Max retry attempts per request
    maxRetryCycles: 5, // Max retry cycles for the entire queue
    retryInterval: 3000, // Delay between retries (in milliseconds)
    fallbackToFetch: true, // Use Fetch API if Beacon API fails
    storeFailed: true, // Store failed requests for later retry
    debug: true, // Enable debug logging
});

Fanos.send({
    event: 'error',
    message: 'Simulating network failure',
    timestamp: Date.now(),
}).then(() => console.log('Request sent successfully!'))
    .catch(err => console.error('Request failed, will retry:', err));

// Optionally, manually flush queued requests after network recovery
setTimeout(() => {
    console.log('Manually flushing failed requests...');
    Fanos.flush();
}, 10000); // Flush after 10 seconds
```

## Important Notes:

- The **Beacon API does not guarantee delivery**, so enabling `fallbackToFetch` is recommended.
- `retryInterval` controls how long **Fanos** waits between retry attempts.
- Use `flush()` to manually send stored failed requests instead of waiting for automatic retries.


## More Examples

1. [Blob Payload](./blob-data.md)
2. [FormData Payload](./form-data.md)
3. [JSON Payload](./json.md)
4. [Primitive Data](./primitive-data.md)
5. [URL-encoded - URLSearchParams Payload](./url-encoded-data.md)
6. [Splitting Large Payloads](./splitting-large-payloads.md)
7. [Custom Header](./custom-headers.md)
8. [Failed Request](./handling-failed-requests.md)
9. [Destroy Instance](./destroying-instance.md)
10. [Manually Flushing the Queue](./manually-flushing-queue.md)
11. [Fallback to Fetch API](./fallback-to-fetch.md)
12. [Debugging](./debugging.md)

## Documentation
For detailed information about the API and configuration options, refer to the [documentation](/docs/index.md).