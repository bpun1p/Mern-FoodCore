FROM node:latest

RUN mkdir -p /MERN-FoodCore-Client

COPY ./client /MERN-FoodCore-Client

WORKDIR /MERN-FoodCore-Client

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]