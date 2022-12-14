FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/client
COPY package*.json ./
RUN npm ci --only=production

FROM node:alpine AS builder

WORKDIR /app/client
COPY . .
COPY --from=deps /app/client/node_modules ./node_modules
RUN npm run build && npm install --production --ignore-scripts --prefer-offline

FROM node:alpine AS runner
WORKDIR /app/client

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/client/next.config.js ./
COPY --from=builder /app/client/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/client/.next ./.next
COPY --from=builder /app/client/node_modules ./node_modules
COPY --from=builder /app/client/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]