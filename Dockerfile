FROM node:21.2.0


WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/main.js"]
