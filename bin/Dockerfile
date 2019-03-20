FROM dadhx05.interno:9092/oidigital/centos-node8
MAINTAINER diogo.leitao@oi.net.br

USER root

# configure npm on nexus cache repository
RUN npm config set registry http://dadhx05.interno:8081/repository/npm-group/

# set default workdir
RUN mkdir -p /usr/src/my-application
WORKDIR /usr/src/my-application

# install app dependencies
COPY package.json /usr/src/my-application/
RUN if $http_proxy; then npm config set proxy=$http_proxy; fi
RUN if $http_proxy; then npm config set https-proxy=$http_proxy; fi
RUN if $http_proxy; then npm config set strict_ssl false; fi
RUN npm install

# bundle app source
COPY . /usr/src/my-application/

RUN mkdir -p /usr/src/my-application/test/reports && chown -R app:appgrp /usr/src/my-application/

USER app

# expose app port and run
EXPOSE 8090

CMD ["node", "app"]