# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables (to be passed via Docker Compose)
ENV NODE_ENV=production

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "src/server.js"]
