# Use Node 22-slim as the base image
FROM node:22-slim 

# Set working directory inside the container
WORKDIR /app

RUN apt-get update && apt-get install -y openssl

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# copy the prisma files and generate the database client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the app
COPY server.js ./
COPY routes ./routes

# Expose the port the Node app runs on
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
