# Sending JSON Data

Sending **JSON data** is the most common use case for analytics, logging, and tracking events. The **Fanos** library ensures that data is sent asynchronously with `Beacon API` (or `Fetch` as a fallback).

- User activity tracking (login/logout events)
- Error reporting & debugging
- Sending structured data to an API

```javascript
// Configure the global instance with recommended settings
Fanos.configure({
    url: 'https://example.com/api/log', // API endpoint
    headers: { 'Authorization': 'Bearer your-token' }, // Custom headers (optional)
    debug: true, // Enable debug logging
    storeFailed: true, // Store failed requests for retrying
    fallbackToFetch: true, // Use fetch if Beacon API fails
});

// Create a JSON payload
const payload = {
    userId: 12345,
    action: 'login',
    details: {
        browser: navigator.userAgent,
        os: navigator.platform,
        timestamp: new Date().toISOString(),
    },
};

// Send the JSON payload
Fanos.send(payload)
    .then(() => console.log('Data sent successfully!'))
    .catch(err => console.error('Failed to send data:', err));
```

## Important Notes:

- The default `Content-Type` is `application/json`.
- If the payload exceeds **64KB**, it will be split into smaller chunks.
- If `sendBeacon` fails and `fallbackToFetch: true`, the library will attempt to send the request using `Fetch` API.


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