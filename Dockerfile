# Use the official Node.js image as the base image
FROM node:18-alpine3.17

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the required packages
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]