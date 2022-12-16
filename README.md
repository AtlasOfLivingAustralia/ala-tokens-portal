# ALA Client Registration and Token Generation 

https://tokens.ala.org.au 

A React Single Page Application (SPA) for [JSON Web Token](https://jwt.io/) (JWT) generation using the [PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce) flow. 

The generated JWTs can be used to invoke protected ALA APIs documented at https://docs.ala.org.au. 

## Setup & Running

App is configured to run on a docker container locally.

1. `./doc.sh image` - build the docker container image. This only has to be done once or if the Docker file is updated
2. `./doc.sh build`  - builds the react app inside the container. The local host dir   is mounted inside the container so the build artifact ends up on the local file system

3. `./doc.sh run`   - runs a Vite dev server inside the container and maps it to http://127.0.0.1:3000/
