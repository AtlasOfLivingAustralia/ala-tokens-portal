MAKE=make

build:
	docker run --rm -v "$(PWD)":"/build" \
                        -w /build \
                        -e docker_user=`id -u` \
                        -e docker_group=`id -g` \
                        -e MOUNT_DIR=/build \
                         pkce-build-container:latest \
                         /build/build_inside_docker.sh

image:
	docker build --tag pkce-build-container .	


run:
	docker run --rm -d -v "$(PWD)":"/build" \
                        -p 127.0.0.1:80:3000 \
                        -w /build \
                        -e docker_user=`id -u` \
                        -e docker_group=`id -g` \
                        -e MOUNT_DIR=/build \
                         pkce-build-container:latest \
                         npm run dev