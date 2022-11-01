# Stage 1: install dependencies
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Stage 2: build
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
COPY public ./public
COPY package.json ./
RUN npm run build

# Stage 3: run
# FROM  --platform=linux/amd64 node:lts-alpine
FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
CMD ["npm", "start"]
