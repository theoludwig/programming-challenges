FROM node:22.15.0 AS builder-dependencies
WORKDIR /usr/src/application
COPY ./package*.json ./
RUN npm install

FROM node:22.15.0 AS builder
WORKDIR /usr/src/application
COPY --from=builder-dependencies /usr/src/application/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12:latest AS runner
WORKDIR /usr/src/application
ENV NODE_ENV=production
COPY --from=builder /usr/src/application/package.json ./package.json
COPY --from=builder /usr/src/application/build ./build
CMD ["./build/solution.js"]
