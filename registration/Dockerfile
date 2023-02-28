FROM node:14-alpine3.12
WORKDIR /usr/src/registration
COPY package.json /usr/src/package.json
RUN npm install 
COPY . . 
EXPOSE 3000
CMD [ "node", "index.js" ]