FROM node:20-alpine as base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM deps AS builder
COPY . .
RUN npm run build

FROM deps AS prod-deps
RUN npm install --production

FROM base as runner
RUN addgroup --system --gid 1001 remix
RUN adduser --system --uid 1001 remix
USER remix
COPY --from=prod-deps --chown=remix:remix /app/package*.json ./
COPY --from=prod-deps --chown=remix:remix /app/node_modules ./node_modules
COPY --from=builder --chown=remix:remix /app/build ./build
COPY --from=builder --chown=remix:remix /app/public ./public
ENV HOST 0.0.0.0
ENV PORT 8080
ENTRYPOINT ["node", "node_modules/.bin/remix-serve", "build/server/index.js"]
