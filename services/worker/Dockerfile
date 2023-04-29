# Use Node.js official image with Chrome preinstalled as the base image
FROM browserless/chrome:latest

# Create app directory
WORKDIR /app

# Copy only production dependencies
COPY package.json .
RUN npm install --omit=dev

# Copy built files
COPY dist/ /app/dist

# Expose worker port
EXPOSE 3000

# Start worker script
CMD ["npm", "start"]
