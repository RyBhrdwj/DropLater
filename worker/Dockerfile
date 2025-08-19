FROM node:18

WORKDIR /app

COPY worker/package*.json ./
RUN npm install

COPY worker/ .

COPY shared/ ./shared

RUN npm install -g nodemon
CMD ["npm", "run", "dev"]
