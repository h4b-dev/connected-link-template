<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://cdn.jsdelivr.net/gh/andreinhugo/hugo-login-assets/hb-logo.svg" alt="Logo" width="380" height="80">
  </a>
  <h3 align="center">H4B Connected Link Template</h3>

  <p align="center">
      the template used to create connected links
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This is full-stack project composed of two separate packages:

```
connected-link-template
  -- server (NodeJS API)
  -- client (Preact app)
```

### Built With

Server:
  * [NodeJs](https://nodejs.org)
  * [Express](https://expressjs.com/)

Client:
* [Vite](https://vitejs.dev)
* [preact](https://preactjs.com)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

Package manager:
* node version >= 14
* npm or yarn

### Installation

1. Clone the repo
2. Install server package deps:
   ```sh
   cd server && npm i
   ```
3. Install client package deps:
   ```sh
   cd client && npm i
   ```
4. if it's the first run the client must be built first:
   ```sh
   npm run build:client
   ```
### Scripts

```js
dev:server // runs server on development watch mode
build:server // builds server code to `server/dist`
prod:server // runs server on production mode
```

### Build

production files are generated in `/server/dist` using the `build:server` script.
