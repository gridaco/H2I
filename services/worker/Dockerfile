# Use Node.js official image with Chrome preinstalled as the base image
FROM browserless/chrome:latest

# Create app directory
WORKDIR /app

# Copy only production dependencies
COPY package.json .
RUN npm install --omit=dev

# Copy built files
COPY dist/ /app/dist

# Start worker script
CMD ["npm", "start"]
