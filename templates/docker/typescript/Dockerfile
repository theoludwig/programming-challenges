FROM node:16.14.0

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm run build

CMD ["node", "build/solution.js"]
