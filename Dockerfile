FROM node:20-alpine

WORKDIR /app

# Copy everything first to avoid cache issues
COPY . .

# Then install dependencies
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
