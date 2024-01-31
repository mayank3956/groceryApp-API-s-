# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port that your app is running on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]
