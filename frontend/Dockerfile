# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Confirm .env is present and readable
RUN echo "--- PRINTING .env ---" && cat .env

# Ensure it's used during build
ENV BUILDING_DOCKER=true
RUN cp .env .env.production && npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

