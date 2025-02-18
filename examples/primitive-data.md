# Sending Primitive Data (`String`, `Number`, `Boolean`)

Primitive data types **strings**, **numbers**, and **booleans** are the simplest forms of data transmission. They are useful for logging simple events, sending status updates, or tracking user interactions without complex structures.

- Logging simple messages `User logged in`, `Page viewed`.
- Sending numerical values 42, representing a user score or event ID.
- Sending boolean flags `true` or `false` for feature toggles or user actions.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/log',
    headers: { 'Content-Type': 'text/plain' },
    debug: true,
});

// Send different primitive data types
Fanos.send("User clicked a button");  // String
Fanos.send(42);  // Number
Fanos.send(true);  // Boolean
```

## Important Notes:

- Structured data use `JSON objects`.
- Multiple key-value pairs use `JSON` or `URLSearchParams`.


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