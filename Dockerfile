FROM ubuntu:focal

# set build variables
ARG DEBIAN_FRONTEND=noninteractive
ARG NODE_VERSION

# update
RUN apt-get update && apt-get -y upgrade

# install apt packages
RUN apt-get update && apt-get -y install \
curl \
zip \
vim && \
apt-get clean && rm -rf /var/lib/apt/lists/*

# install node apt repo
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -

RUN apt-get update && apt-get -y install \
nodejs