FROM node:10.13-alpine
#ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm i -g @angular/cli@7.2.2
RUN npm install
CMD ng serve --host 0.0.0.0
