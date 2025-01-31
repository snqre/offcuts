FROM oven/bun:latest
WORKDIR /app
COPY tsconfig.json .
COPY package.json .
COPY bun.lockb .
COPY script ./script
COPY src ./src
COPY target ./target
COPY .env /.env
ENV NODE_PATH=/app
EXPOSE 3000
CMD bun install && bun run target/node/server.cjs