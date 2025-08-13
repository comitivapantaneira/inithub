FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies for Prisma (OpenSSL)
RUN apk add --no-cache openssl

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Production image
FROM node:20-alpine AS prod
WORKDIR /app

RUN apk add --no-cache openssl

# Copy only built files and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
