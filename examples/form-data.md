# Sending FormData

`FormData` is commonly used for **submitting HTML forms**, including text fields and file uploads. **Fanos** supports `FormData`, allowing seamless transmission of key-value pairs to the server.

- Submitting form fields dynamically
- Sending files (Ensure the payload is within 64KB)
- API requests that require `multipart/form-data` encoding

```javascript
// Configure the global instance with recommended settings
Fanos.configure({
    url: 'https://example.com/api/form-submit', // API endpoint
    headers: { 'X-Custom-Header': 'value' }, // Custom headers (optional)
    debug: true, // Enable debug logging
    fallbackToFetch: true, // Use fetch if Beacon API fails
    storeFailed: true, // Store failed requests for retrying
});

// Create FormData object
const formData = new FormData();
formData.append('username', 'john_doe');
formData.append('action', 'login');

// Send FormData
Fanos.send(formData)
    .then(() => console.log('Form submitted successfully!'))
    .catch(err => console.error('Failed to send form data:', err));
```

## Important Notes:

- File uploads are not recommended via `sendBeacon`, as it has a **64KB limit**. Large files might get truncated.
- Ensure the server supports `multipart/form-data`.
- If you need to send files reliably, consider using `Fetch` directly instead.


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