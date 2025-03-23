FROM node:12-alpine

RUN apk add --no-cache python2 g++ make

WORKDIR /app
COPY . .
RUN yarn install --production

EXPOSE 3000

CMD ["node","src/index.js"]