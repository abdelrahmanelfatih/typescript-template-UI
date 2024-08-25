# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 4173

# Define the command to start the app
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
