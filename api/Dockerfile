FROM node:18

WORKDIR /app

# Copy API's package.json and install deps
COPY api/package*.json ./
RUN npm install

# Copy API source code
COPY api/ .

COPY shared ./shared

# Set port
ENV API_PORT=3000
EXPOSE 3000

# Run with nodemon or npm script
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]
