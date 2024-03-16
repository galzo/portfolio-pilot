# Dockerfile for frontend
FROM node:latest as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "start:dev"]
