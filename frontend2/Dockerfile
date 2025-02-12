# Use official Node.js as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files to the container
COPY . .

# Build the Vite React app
RUN npm run build

# Install `serve` to serve the built files
RUN npm install -g serve

# Expose the port Vite uses (if serving dev) or the static file port (if serving built files)
EXPOSE 4173

# Serve the built React app
CMD ["serve", "-s", "dist", "-l", "4173"]
