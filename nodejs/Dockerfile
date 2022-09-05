FROM node:16.10.0
WORKDIR /usr/src/app

COPY ./app ./

RUN npm install -g yarn && yarn install

EXPOSE 8080
