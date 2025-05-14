# Use Node.js official base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install app dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (default Express port is 5000)
EXPOSE 5000

# Command to run your application
CMD ["node", "server.js"]


