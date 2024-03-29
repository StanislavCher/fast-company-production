FROM node:16.20.1-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install

COPY client /app/client

RUN npm run build

FROM node:18.16.1-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

COPY --from=client /app/client/build app/client

EXPOSE 8080

CMD [ "npm", "start" ]