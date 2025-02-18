# Fallback to Fetch API

The **Beacon API** is ideal for sending data without blocking page navigation, but it **does not guarantee delivery**, especially for larger payloads or unstable networks. **Fanos** provides an automatic fallback to the **Fetch API**, ensuring that requests are delivered reliably even when `sendBeacon` fails.

- **Primary Attempt**: Sends data using `navigator.sendBeacon()`.
- **Fallback Mechanism**: If `sendBeacon` fails (due to size limits, browser restrictions, or network issues), the request is retried using `Fetch`.
- **Retry Logic**: If `Fetch` also fails, **Fanos** can store failed requests in `localStorage` and retry them later.

```javascript
// Configure the global instance with Fetch fallback
Fanos.configure({
    url: 'https://example.com/api/log',
    fallbackToFetch: true, // Enable Fetch API fallback if Beacon API fails
    storeFailed: true, // Store failed requests for later retry
    maxAttemptsPerRequest: 3, // Retry up to 3 times before considering it failed
    retryInterval: 3000, // Wait 3 seconds between retries
    debug: true, // Enable debug logging
});

Fanos.send({
    event: 'fallback_test',
    message: 'Testing Fetch API as a fallback mechanism',
    timestamp: Date.now(),
})
    .then(() => console.log('Request sent successfully!'))
    .catch(err => console.error('Request failed, using fallback:', err));

// Optionally, manually flush stored requests in case of network recovery
setTimeout(() => {
    console.log('Flushing any stored failed requests...');
    Fanos.flush();
}, 10000); // Flush after 10 seconds
```

## Important Notes:

- The **Beacon API** has a payload size limit of **64KB**. Larger requests will automatically be split into chunks.
- If using `Fetch`, the request may be blocked if the user closes the page before completion.
- Enable `storeFailed: true` to persist failed requests and retry them later.


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