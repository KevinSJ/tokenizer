FROM node:lts-alpine AS deps

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile -P


FROM node:lts-alpine AS dev

WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
EXPOSE 3000
RUN corepack enable
CMD ["pnpm", "start"]

