FROM node:lts-slim AS src
RUN apt-get update && apt-get install -y wait-for-it
RUN npm i -g aws-cdk aws-cdk-local

WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build:clean