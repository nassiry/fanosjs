# Manually Flushing the Queue

The `flush` method forces all **queued requests** (including previously failed ones) to be sent immediately. This is useful when:

- Ensuring important data is sent before navigating away from the page.
- Manually retrying failed requests instead of waiting for automatic retries.
- Debugging queued requests to check if they are successfully transmitted.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/log',
    debug: true,
    storeFailed: true,  // Ensure failed requests are stored for retrying
    autoFlush: false,   // Disable automatic flushing to manually control it
});

// Send some requests (assume network issues 
// prevent them from being sent)
Fanos.send({ event: "page_load", timestamp: Date.now() });
Fanos.send({ event: "button_click", buttonId: "submit" });

// Later, manually flush the queue when 
// the network is stable
setTimeout(() => {
    console.log("Flushing pending requests...");
    Fanos.flush();
}, 5000);
```

## Important Notes:

- The queue holds failed requests (if `storeFailed: true` is set in the config).
- If there are no pending requests, calling `flush() `does nothing.
- `flush()` respects retry limits (`maxAttemptsPerRequest` and `maxRetryCycles`).


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

