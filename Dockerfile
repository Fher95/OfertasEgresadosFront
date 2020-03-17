### STAGE 1: Build ###

FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build 

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
LABEL authors="CristianPip3"
COPY --from=build /usr/src/app/dist/OfertasEgresadosFront  /usr/share/nginx/html
