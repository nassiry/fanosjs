# Advanced: Splitting Large Payloads

**Fanos** automatically splits large payloads into smaller chunks if they exceed the `maxPayloadSize`. This ensures that your data is transmitted efficiently, even when dealing with large files or datasets.

- **Fanos** checks if the payload exceeds the `maxPayloadSize`.
- If it does, the payload is split into smaller chunks.
- Each chunk is sent as a separate request.
- The server must reassemble the chunks to reconstruct the original payload.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/log', // Endpoint for sending data
    maxPayloadSize: 1000, // 1KB (for testing purposes)
    debug: true, // Enable debug logging
});

// Create a large payload (2KB)
const largePayload = {
    data: 'a'.repeat(2000) // 2000 characters = ~2KB
};

// Send the large payload
Fanos.send(largePayload)
    .then(() => console.log('Large payload sent successfully'))
    .catch(err => console.error('Failed to send large payload:', err));
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

