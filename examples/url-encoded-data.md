# Sending URLSearchParams

The URLSearchParams format is commonly used for form submissions when sending key-value pairs in a compact, URL-encoded format. This format is ideal for simple text-based data, such as login credentials, search queries, or small form submissions.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/submit',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // Explicitly set content type
    debug: true,
});

// Create URLSearchParams
const params = new URLSearchParams();
params.append('username', 'Alice');
params.append('password', 'secret');

// Send URLSearchParams
Fanos.send(params)
    .then(() => console.log('Data sent successfully'))
    .catch(err => console.error('Failed to send data:', err));
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