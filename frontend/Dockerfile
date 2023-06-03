# Build stage
FROM node AS build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
#WORKDIR /app
#COPY --from=build /app/dist /app
COPY --from=build /build/dist/ /usr/share/nginx/html/
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN ls -la /usr/share/nginx/html/

#EXPOSE 8080
#CMD ["npm", "start"]
