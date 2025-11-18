FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma

COPY . .

RUN npm install -g nodemon

COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
