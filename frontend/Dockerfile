# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Copy CI-safe environment config
COPY .env.ci .env

# Print it to verify it's available
RUN echo "--- PRINTING .env ---" && cat .env

# Build with the injected env
ENV BUILDING_DOCKER=true
RUN npm run build



# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

