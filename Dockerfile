FROM oven/bun:1 as base

WORKDIR /usr/src

COPY src .

RUN bun install

ENTRYPOINT [ "bun", "run", "index.ts" ]
