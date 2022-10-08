FROM node:16.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i --save moment
RUN npm install --only=dev

COPY . .

RUN npm run build

RUN npm run generate

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start"]
