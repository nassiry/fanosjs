<div align="center">

# Fanos 🏮

![npm version](https://img.shields.io/npm/v/fanos.svg)
![Total Downloads](https://img.shields.io/npm/dt/fanos.svg)
![License](https://img.shields.io/npm/l/fanos.svg)

</div>

**Fanos** is a lightweight JavaScript `promise-based` library that simplifies sending asynchronous requests using the [Beacon API](https://w3c.github.io/beacon/). It ensures reliable, non-blocking transmission of data to a server, making it ideal for scenarios like analytics, logging, and tracking user interactions. However, it does **but not guaranteed if the browser is closed suddenly**.

To improve reliability, **Fanos** includes an **optional fallback mechanism using `Fetch`** and supports **automatic retrying of failed requests**. This ensures that your data is transmitted reliably, even in challenging network conditions.


## Table of Contents

1. [Features](#features)
2. [Installation](#1-installation)
    - [Load From Path](#browser)
    - [CDN](#cdn)
    - [ES Modules](#es-modules)
3. [Quickstart](#2-quickstart)
   - [Instance-Based Approach](#instance-based-approach)
    - [Static Method (Global Configuration)](#static-method-global-configuration)
    - [Flushing the Queue Manually](#flushing-the-queue-manually)
    - [Destroying the Instance](#destroying-the-instance)
4. [Important Notes](#3-important-notes)
5. [Next Steps](#4-next-steps)
6. [Browser & Node.js Compatibility](#browser--nodejs-compatibility)
7. [Contributions](#contributions)
8. [Changelog](#changelog)
9. [License](#license)

## Features

- ⏳ **Asynchronous request sending**: Uses the `Beacon API` for non-blocking requests.
- 🔄 **Optional Fetch fallback**: Enables `Fetch` as a backup if `sendBeacon` fails.
- 🔁 **Automatic retry**: Stores failed requests in `localStorage` and retries them.
- 🔄 **Multiple payload formats**: Supports `JSON`, `FormData`, `URL-encoded data`, and `Blobs`.
- 🧑‍💻 **Custom headers**: Allows adding `headers` for requests.
- 🐞 **Debug mode**: Logs internal operations for troubleshooting.

## 1. Installation

You can include **Fanos** in your project via a script tag or install it using `npm`:

```bash
npm install fanos
```

#### Load From Path

Include the library directly in your HTML:

```html
<script src="path/to/fanos.js"></script>
```
#### CDN

Use the library via a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/fanos@latest/dist/fanos.umd.min.js"></script>
```

#### ES Modules

Import the library in your JavaScript project:

```javascript
import Fanos from 'dist/fanos.esm'
```

## 2. Quickstart

Here’s how to get started with **Fanos** in just a few lines of code:

- ### Instance-Based Approach

```javascript
const fanos = new Fanos({
   url: 'https://example.com/api/log',
});

const payload = {
   userId: 123,
   action: 'login',
   details: { browser: 'Chrome', os: 'Windows' },
};

fanos.send(payload)
   .then(() => console.log('Sent successfully'))
   .catch(err => console.error('Failed to send:', err));
```

- ### Static Method (Global Configuration)

```javascript
Fanos.configure({
    url: 'https://example.com/api/log',
    debug: true,
});

Fanos.send(payload)
    .then(() => console.log('Sent successfully'))
    .catch(err => console.error('Failed to send:', err));
```
- ### Flushing the Queue Manually

The `flush` method sends all queued requests immediately.

```javascript
fanos.flush()
```

- ### Destroying the Instance

The `destroy` method cleans up resources and stops retries:

```javascript
fanos.destroy()
```

## 3. Important Notes

- **Beacon API Dependency**: Fanos relies on the [Beacon API](https://w3c.github.io/beacon/), which is supported in modern browsers. For older browsers, enable the `fallbackToFetch` option to use `Fetch` as a fallback.

- **Node.js Compatibility**: Fanos is designed for browser environments and is **not compatible with Node.js**.

- **Debugging**: Enable the `debug` option to log internal operations for troubleshooting.

## 4. Next Steps

- Explore the full list of [Configuration Options](/docs/configuration.md).
- Check out more [examples](/examples/index.md) for advanced usage.
- Refer to the detailed [API documentation](/docs/api.md) for all available methods and properties.

## Browser & Node.js Compatibility

| Browser/Environment | Support |
|---------------------|---------|
| Chrome              | Latest ✔ |
| Firefox             | Latest ✔ |
| Safari              | Latest ✔ |
| Opera               | Latest ✔ |
| Edge                | Latest ✔ |
| Node.js             | No ❌   |


## Contributions

We welcome contributions! Please read the [Contributions Guid](CONTRIBUTIONS.md) to learn how to contribute.

## Changelog

See [Changelog](CHANGELOG.md) for release details.

## License

This package is open-source software licensed under the [MIT license](LICENSE).