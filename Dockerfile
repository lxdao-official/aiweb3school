# syntax=docker.io/docker/dockerfile:1

FROM node:20-slim AS base
RUN npm install -g bun@1.3.6

FROM base AS deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN bun run docs:build

FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/docs/.vuepress/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
