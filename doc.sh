#!/bin/bash

set -e

###
# This is a wrapper to prep the environment then run the varous docker
# commands to build the docker image, build the react app and run it 
# in the container for local dev
#
# It takes a single required argument
#
#  image - build the docker container image. This only has to be done once
#          or if the Docker file is updated
#
#  build - builds the react app inside the container. The local host dir
#          is mounted inside the container so the build artifact ends up
#          on the local file system
#
#  run   - runs a Vite dev server inside the container and maps it to
#          http://127.0.0.1/


###
# build the docker container image
build_image() {
  # get NODE_VERSION from the config
  eval $(cicd/pipeline/gen_env_vars.py --env local --conf config.ini --clean-branch local)

	docker build --tag pkce-build-container --build-arg NODE_VERSION=$NODE_VERSION .	
}

###
# build the node app inside the docker container
build_app() {
  # first check if the image exists
  image_id=$(docker image ls -qf "reference=pkce-build-container")

  if [ -z $image_id ] ; then 
     echo "The container image needs to be built. use $0 image"
     exit 0
  fi

  write_local_conf

  rm -rf dist
	docker run --rm -v "$(PWD)":"/build" \
                        -w /build \
                         pkce-build-container:latest \
                         npm install; npm run build

}

###
# write an .env.local file with values from conf.ini for the local build
write_local_conf() {

  # get Vite vars from the config
  eval $(cicd/pipeline/gen_env_vars.py --env local --conf config.ini --clean-branch local)

  # in case there's a production file.. 
  rm -f .env.production

  echo Writing local config .env.local
  cat << EOF > .env.local
VITE_APP_VERSION=$VITE_APP_VERSION

# ALA OIDC
VITE_OIDC_AUTHORITY=$VITE_OIDC_AUTHORITY
VITE_OIDC_REDIRECT_URI=$VITE_OIDC_REDIRECT_URI
VITE_OIDC_LOGOUT_REDIRECT_URI=$VITE_OIDC_LOGOUT_REDIRECT_URI
VITE_TOKENS_API=$VITE_TOKENS_API
VITE_CLIENT_ID=$VITE_CLIENT_ID
VITE_CLIENT_SECRET=$VITE_CLIENT_SECRET
VITE_SCOPE=$VITE_SCOPE
EOF

}

###
# Run the node app inside the docker conatiner
run_app() {
  # first check if the container is already running
  container_id=$(docker container ls -qf "ancestor=pkce-build-container")

  if [ ! -z $container_id ] ; then 
     echo "Server already running on http://127.0.0.1:3000/" 
     exit 0
  fi

	docker run --rm -d -v "$(PWD)":"/build" \
                        -p 127.0.0.1:3000:3000 \
                        -w /build \
                         pkce-build-container:latest \
                         npm run dev

  echo "Vite dev server running on http://127.0.0.1:3000/"
}

usage() {
    echo "Usage: $0 { image | build | run }"
    echo "       image - build the docker image"
    echo "       build - build the react app inside the docker container"
    echo "       run   - run the react app inside the docker container"
}

# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Error: No argument provided"
  usage
  exit 1
fi

# Store the argument in a variable
arg=$1

# Use a case statement to determine which function to call
case $arg in
  "image")
    build_image
    ;;
  "build")
    build_app
    ;;
  "run")
    run_app
    ;;
  *)
    echo "Error: Invalid argument provided"
    usage
    exit 1
    ;;
esac