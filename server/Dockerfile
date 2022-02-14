FROM node:16.5.0-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

ENV DB_URI = 'mongodb://mongo:27017/thatcrud'
ENV SECRET = 'a467gg7jw347'

EXPOSE 3001

CMD ["npm", "run", "dev"]