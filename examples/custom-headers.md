# Using Custom Headers

Custom headers are essential when working with APIs that require **authentication**, **content negotiation**, or **custom metadata**. **Fanos** allows setting global headers that apply to all requests.

- **Authentication**: Sending API tokens `Authorization: Bearer <token>`
- **Custom Metadata**: Adding extra request context (`X-User-ID`, `X-Request-ID`)
- **Content-Type Control**: Overriding default `Content-Type` headers

```javascript
/// Configure the global instance with custom headers
Fanos.configure({
    url: 'https://example.com/api/log', // API endpoint
    headers: {
        'Authorization': 'Bearer abc123xyz', // Authentication token
        'X-Client-Version': '1.0.0', // Custom metadata
        'X-Request-ID': crypto.randomUUID(), // Unique request identifier
    },
    debug: true, // Enable debug logging
});

// Create a JSON payload
const payload = {
    event: 'custom_headers',
    message: 'Testing custom headers',
    timestamp: Date.now(),
};

// Send request with custom headers
Fanos.send(payload)
    .then(() => console.log('Request with custom headers sent successfully!'))
    .catch(err => console.error('Failed to send request:', err));
```

## Important Notes:

- **Custom headers apply to all requests** made through the configured instance.
- If using **CORS-restricted APIs**, ensure the server supports these headers.
- The `Content-Type` is automatically set to `application/json` unless overridden.


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