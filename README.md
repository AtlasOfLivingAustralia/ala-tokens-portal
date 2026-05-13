# ALA Client Registration and Token Generation

https://tokens.ala.org.au

A React Single Page Application (SPA) for [JSON Web Token](https://jwt.io/) (JWT) generation using the [PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce) flow.

The generated JWTs can be used to invoke protected ALA APIs documented at https://docs.ala.org.au.

## Setup & Running

App is configured to run directly inside this repository devcontainer.

1. Rebuild/reopen the devcontainer after pulling changes.
2. During container creation, `.env.local` is generated from `config.ini` and dependencies are installed.
3. On each container start, the Vite dev server is started automatically and hosted at `http://127.0.0.1:3000/`.

Vite rebuilds automatically on file changes, so updates appear live while developing.
