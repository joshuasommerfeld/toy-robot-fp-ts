FROM node:16.13.2-alpine

COPY . .

RUN yarn

CMD yarn start
