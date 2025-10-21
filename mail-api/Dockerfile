FROM node:20-alpine

COPY package.json package-lock.json* ./
RUN npm ci --production

COPY . .

EXPOSE 3001
CMD [ "node", "index.js" ]