# Destroying the Instance

Destroying a **Fanos** instance is useful when you want to:
 
- Stop ongoing retries of failed requests.
- Clear stored configurations and queued requests.
- Release resources to prevent memory leaks in long-running applications.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/log',
    storeFailed: true, // Store failed requests before destroying
    debug: true, // Enable debug logging
});

// Send a sample request
Fanos.send({ event: 'shutdown', message: 'Preparing to destroy instance' })
    .then(() => console.log('Request sent successfully'))
    .catch(err => console.error('Request failed:', err));

// Ensure all stored requests are sent before destroying
setTimeout(() => {
    console.log('Flushing queued requests before destroying...');
    Fanos.flush();

    // Destroy the instance to clean up resources
    console.log('Destroying Fanos instance...');
    Fanos.destroy();
}, 5000); // Wait 5 seconds before destroying
```

## Important Notes:

- Calling `Fanos.destroy()` removes stored failed requests, so they won’t be retried.
- If you want to retry failed requests before destroying, manually flush the queue using `Fanos.flush()`.


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