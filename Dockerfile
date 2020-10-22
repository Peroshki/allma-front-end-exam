# Pull official base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install node packages
RUN npm install --silent

# Copy app to Docker environment
COPY . ./

# Expose the port used by the application
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
