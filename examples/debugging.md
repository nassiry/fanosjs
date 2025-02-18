# Debugging

The debug option in **Fanos** enables detailed logging of internal operations, including requests, retries, and errors. This is especially useful for troubleshooting issues during development.

- Debug logging should be disabled in production to avoid cluttering the console.

```javascript
// Configure the global instance with debug logging
Fanos.configure({
    url: 'https://example.com/api/log', // Endpoint for sending data
    debug: true, // Enable debug logging
});

// Send a request with debug logging
Fanos.send({
    event: 'debug',
    message: 'Testing debug logs'
}).then(() => console.log('Request sent successfully'))
    .catch(err => console.error('Failed to send request:', err));
```


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