FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Fallback to regular npm install if npm ci fails
RUN npm ci || npm install

# Copy application source
COPY . .

# Build static output
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80