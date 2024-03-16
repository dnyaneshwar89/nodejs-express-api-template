FROM node:18.17.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
ENV PORT 8080
CMD npm start
