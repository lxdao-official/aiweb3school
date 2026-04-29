# syntax=docker.io/docker/dockerfile:1.7

ARG BUN_VERSION=1.3.6
ARG NODE_VERSION=20

FROM oven/bun:${BUN_VERSION}-slim AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM deps AS builder
WORKDIR /app

COPY . .

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN bun run docs:build

FROM node:${NODE_VERSION}-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder --chown=node:node /app/docs/.vuepress/dist ./dist
COPY --chown=node:node server.js ./server.js

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000)).then((res) => { if (!res.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["node", "server.js"]
