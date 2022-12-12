FROM ubuntu:focal

# set any environment variables
ENV DEBIAN_FRONTEND=noninteractive

ARG ubuntu_version=focal

# update
RUN apt-get update && apt-get -y upgrade

# install apt packages
RUN apt-get update && apt-get -y install \
curl \
zip \
vim && \
apt-get clean && rm -rf /var/lib/apt/lists/*

# install node apt repo
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get update && apt-get -y install \
nodejs