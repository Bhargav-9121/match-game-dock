FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g vite

COPY . .

RUN npm run build

EXPOSE 2000

CMD ["npm", "run", "dev"]
