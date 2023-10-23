# Use the official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the entire project to the container (excluding files specified in .dockerignore)
COPY . .

# Set the environment variable for the Node.js port (optional)
ENV PORT=3000

# Expose the port the app runs on
EXPOSE ${PORT}

# Run the application
CMD ["npm", "start"]