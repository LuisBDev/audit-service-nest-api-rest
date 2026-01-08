# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for migrations)
RUN npm ci

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy source files and tsconfig (needed for migrations)
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
