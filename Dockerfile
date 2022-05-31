FROM node:14-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /src && mv ./node_modules ./src

WORKDIR /src

COPY . .

RUN npm run build


FROM nginx:alpine


COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /src/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]