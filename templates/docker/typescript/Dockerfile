FROM node:16.17.0

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install && npm run build

CMD ["node", "build/solution.js"]
