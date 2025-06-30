# ---------- STAGE 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /usr/app

# Kopieer package.json en lockfile eerst (om caching van installaties te verbeteren)
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer de rest van de app
COPY . .


# Build de Next.js-app
RUN npm run build

# ---------- STAGE 2: Run ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Alleen de nodige bestanden overzetten
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/package.json ./package.json

EXPOSE 3000

# Start in productie
CMD ["npm", "start"]
