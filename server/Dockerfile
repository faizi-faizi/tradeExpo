# syntax=docker/dockerfile:1
ARG NODE_VERSION=20

FROM node:20-bullseye

ENV NODE_ENV=production
WORKDIR /usr/src/app

# ✅ Install canvas system dependencies (Debian)
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

# Install node dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy source
COPY . .

# Permissions
RUN chown -R node:node /usr/src/app/public

USER node

EXPOSE 8080
CMD ["npm","start"]
