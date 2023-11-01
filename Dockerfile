# Stage 1: Build an Angular Docker Image
FROM node:18 AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
ARG configuration=production
RUN npm run build

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.25.3
COPY --from=builder /app/dist/thingy-client-orange /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
# TODO: When the container starts, replace the env.js with values from environment variables
# CMD ["/bin/sh",  "-c",  "exec /usr/sbin/nginx -g 'daemon off;'"]
