# Use Node 22 LTS slim
FROM node:22-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed by Prisma
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy dependency files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy ALL backend source code
COPY . .

# Azure Container Apps listens on this
ENV PORT=3000
EXPOSE 3000

# Run migrations automatically on container startup + start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

