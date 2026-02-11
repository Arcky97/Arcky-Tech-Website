# ---------- STAGE 1: Build ----------
FROM node:24 AS builder

WORKDIR /usr/app

ARG COMMIT_SHA
ENV GIT_COMMIT_SHA=$COMMIT_SHA
# Copy only dependency manifests first (better caching + safety)
COPY package.json package-lock.json ./

# Reproducible install
RUN npm ci

# Copy the rest of the source (NO .next allowed)
COPY . .

# HARD guarantee of a clean build
RUN rm -rf .next
RUN npm run build


# ---------- STAGE 2: Production ----------
FROM node:24 AS runner

WORKDIR /usr/app
ENV NODE_ENV=production

# Copy only what is required to run
COPY --from=builder /usr/app/package.json ./
COPY --from=builder /usr/app/package-lock.json ./
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/content ./content

EXPOSE 3000

CMD ["npm", "run", "start"]
