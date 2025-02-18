# Sending Blob Data

Blob (Binary Large Object) is a data type used to represent binary data, such as files or raw data. **Fanos** supports sending Blob objects, making it ideal for uploading files or transmitting binary data.

### Example: Sending a Blob

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/upload', // Endpoint for file uploads
    debug: true, // Enable debug logging for troubleshooting
});

// Create a Blob from a JSON object
const blob = new Blob(
    [JSON.stringify({
        file: 'example.txt',
        content: 'Hello, World!'
    })],
    {
        type: 'application/json', // Set the MIME type of the Blob
    }
);

// Send the Blob
Fanos.send(blob)
    .then(() => console.log('Blob sent successfully'))
    .catch(err => console.error('Failed to send Blob:', err));
```

### Notes:

- **MIME Types**: Ensure the `type` property of the `Blob` matches the data being sent. For example:
    - `application/json` for JSON data.
    - `image/png` for PNG images.
    - `application/octet-stream` for generic binary data.
- **Large Files**: If the file exceeds the `maxPayloadSize`, **Fanos** will automatically split it into smaller chunks.

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