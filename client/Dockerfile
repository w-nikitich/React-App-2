FROM node:20-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package*.json ./
COPY tsconfig.json ./
# Ensure all dependencies, including devDependencies, are installed
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start nginx
CMD ["npm", "run", "start"]