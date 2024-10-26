# syntax=docker/dockerfile:1.5

# Stage 1: Build
FROM node:19.6-bullseye-slim AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files to install dependencies only
COPY package*.json ./

# Use cache mount for faster builds
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

# Copy the rest of the source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production
FROM node:19.6-bullseye-slim AS production

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy only production dependencies
COPY --from=build /usr/src/app/package*.json ./
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Set non-root user for better security
USER node

# Expose application port
EXPOSE 3000

# Run the NestJS application
CMD ["node", "dist/main"]
