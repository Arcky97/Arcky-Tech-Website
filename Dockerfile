# ---------- STAGE 1: Build ----------
FROM node:24 AS builder

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

EXPOSE 3000

# Start in productie
CMD ["npm", "run", "start"]
