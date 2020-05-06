FROM node:12.16.0-alpine 
LABEL maintainer="dbthd6@gmail.com" 

WORKDIR /build 

COPY . /build 

EXPOSE 5000 

RUN npm i serve -g 

ENTRYPOINT ["serve", "-s", "build"]