# API Documentation

This document provides detailed information about all public methods and properties of the **Fanos** class. Each method is described with its purpose, parameters, return values, and usage examples.

## Table of Contents
1. [Static Methods](#1-static-methods)
    - [`configure(options)`](#11-configureoptions)
    - [`send(data, options)`](#12-senddata-options)
    - [`flush()`](#13-flush)
    - [`destroy()`](#14-destroy)

2. [Instance Methods](#2-instance-methods)
    - [`send(data, options)`](#21-senddata-options)
    - [`flush()`](#22-flush)
    - [`destroy()`](#23-destroy)

## 1. Static Methods

### 1.1 `configure(options)`

Sets global default options for all future calls to `Fanos.send()`. This does not affect existing instances of Fanos.

#### Parameters
- **options** `Object)`: Configuration options. See [Configuration Options](./configuration.md) for details.

#### Returns

The global **Fanos** instance.

```javascript
// Configure the global instance
Fanos.configure({
    url: 'https://example.com/api/log',
    debug: true,
});
```
### 1.2 `send(data, options)`

Sends data to the server using the global **Fanos** instance.

#### Parameters

- **data** (Any) – The payload to send. Supports:
    - **JSON Objects**: `{ event: "click" }`
    - **FormData**: `new FormData()`
    - **Blobs**: `new Blob(["Hello"])`
    - **URLSearchParams**: `new URLSearchParams({ key: "value" })`
    - **Primitives**: (text, number, boolean) `"text"`, `123`, `true`

- **options** (Object, optional): Configuration overrides for this request.

#### Returns

A `Promise` that resolves if the request is successful or rejects if it fails.

```javascript
// Send a JSON payload
Fanos.send({ event: 'click', timestamp: Date.now() });

// Send a string payload
Fanos.send("Hello, World!");

// Send with custom options
Fanos.send({ event: 'login' }, 
    { url: 'https://example.com/api/auth' }
)
    .then(() => console.log('Sent successfully'))
    .catch(err => console.error('Failed to send:', err));
```
### 1.3 `flush()`

Flushes all queued and failed requests immediately. Ensures any pending data is sent to the server.

#### Returns
- `void`

```javascript
// Flush the queue
Fanos.flush();
```
### 1.4 `destroy()`

Completely removes the global **Fanos** instance, clears any stored configurations, and prevents further API calls. Call this when the library is no longer needed to free up resources.

### Returns
- `void`

```javascript
// Destroy the global instance
Fanos.destroy();
```
## 2. Instance Methods

Unlike static methods that apply globally, instance methods operate on a specific **Fanos** instance. This allows multiple configurations for different use cases.

### 2.1 `send(data, options)`
```javascript
// Create a new instance
const fanos = new Fanos({
    url: 'https://example.com/api/log' 
});

// Send data
fanos.send({ 
    event: 'click',
    timestamp: Date.now() 
});
```
### 2.2 `flush()`
```javascript
fanos.flush();
```
### 2.3 `destroy()`
```javascript
// Destroy the instance
fanos.destroy();
```
