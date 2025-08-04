FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node

CMD ["sh", "-c", "npm run start:dev"]
