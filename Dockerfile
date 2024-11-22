FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3002

CMD ["node", "dist/src/main.js"]
