# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the port your React app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
