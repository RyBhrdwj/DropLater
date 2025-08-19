FROM node:18

WORKDIR /app

COPY sink/package*.json ./
RUN npm install

COPY sink/ .

ENV API_PORT=4000

EXPOSE 4000

RUN npm install -g nodemon
CMD ["npm", "run", "dev"]
