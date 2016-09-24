FROM node:argon

RUN apt-get update && apt-get install -y traceroute

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE 80

CMD [ "node", "server.js" ]
