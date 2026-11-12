FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd ./server && npm install --omit=dev

COPY server ./server
COPY client ./client

WORKDIR /app/server

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
