# Dockerfile for frontend
FROM node:latest as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
