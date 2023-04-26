# Use Node.js official image with Chrome preinstalled as the base image
FROM browserless/chrome:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY tsconfig.json /app/tsconfig.json
COPY /src /app/src

# Build the TypeScript source
RUN npm run build

# Expose worker port
EXPOSE 3000

# Start worker script
CMD ["npm", "start"]