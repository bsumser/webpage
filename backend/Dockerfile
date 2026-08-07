# ==========================================
# Build Stage
# ==========================================
FROM golang:1.25-alpine AS builder

# Install CA certificates and git (if needed for go mod)
RUN apk add --no-cache ca-certificates git

WORKDIR /app

# Step 1: Copy module files first to leverage Docker layer caching
COPY go.mod go.sum ./
RUN go mod download

# Step 2: Copy the rest of the source code
COPY . .

# Step 3: Build the static Go binary
# CGO_ENABLED=0 creates a fully static binary
# -ldflags="-s -w" strips debug information to shrink binary size
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server main.go

# ==========================================
# Final Runtime Stage
# ==========================================
FROM alpine:3.19

# Install runtime dependencies (TLS certificates & timezone data)
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/server .

# Expose the port your server listens on (e.g., 8080)
EXPOSE 8080

# Run the backend binary
CMD ["./server"]