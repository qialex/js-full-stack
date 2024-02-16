FROM node:18-alpine

WORKDIR /app
COPY package*.json .
RUN npm install --force
# RUN npm rebuild
COPY . .
CMD npm run start:dev:docker