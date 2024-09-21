# develop stage
FROM node:20-alpine as global-develop-stage
RUN npm i --location=global @vue/cli

FROM global-develop-stage as develop-stage
WORKDIR /src
COPY package*.json ./
#COPY .npmrc ./
COPY . .

# build stage
FROM develop-stage as local-deps-stage
RUN npm i

# production stage
FROM nginx:1.17.0-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]