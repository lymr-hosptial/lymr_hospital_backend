FROM node:alpine
WORKDIR /usr/src/authentication
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 3000
CMD [ "node", "index.js" ]
