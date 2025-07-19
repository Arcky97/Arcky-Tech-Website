# ---------- STAGE 1: Build ----------
FROM node:24 AS builder

WORKDIR /usr/app
COPY ./ /usr/app

# Install dependencies
RUN npm install

# Build the Next.js app
RUN npm run build

# ---------- STAGE 2: Production ----------
FROM node:24 AS runner

WORKDIR /usr/app

# Copy only necessary files from the build stage
COPY --from=builder /usr/app/package.json ./
COPY --from=builder /usr/app/package-lock.json ./
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/node_modules ./node_modules

EXPOSE 3000

# Start in production mode
CMD ["npm", "run", "start"]
