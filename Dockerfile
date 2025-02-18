# Use Node.js LTS as base image
FROM node:20-slim

# Set working directory for citadel-cli
WORKDIR /citadel-cli

# Copy citadel-cli project files
COPY . .

# Install dependencies and build citadel-cli
RUN npm install
RUN npm run build

# Create and setup React app
WORKDIR /app
RUN npm install -g create-vite
RUN create-vite my-app --template react-ts
WORKDIR /app/my-app

# Install React app dependencies
RUN npm install

# Link local citadel-cli
RUN npm link /citadel-cli

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
