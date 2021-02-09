FROM node:12 AS builder

WORKDIR /usr/server/

COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]