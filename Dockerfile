# -------------------------------
# Base image
# -------------------------------
  ARG NODE_VERSION=18
  FROM node:${NODE_VERSION}-alpine AS base
  
  WORKDIR /app
  
  # Add compatibility packages (needed by sharp/next/image)
  RUN apk add --no-cache libc6-compat
  
  # -------------------------------
  # Dependencies stage
  # -------------------------------
  FROM base AS deps
  
  # Copy lockfiles (supporting yarn, npm, pnpm)
  COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
  RUN yarn install --frozen-lockfile --verbose
  
  # -------------------------------
  # Build stage
  # -------------------------------
  FROM base AS builder
  WORKDIR /app
  
  # Copy installed node_modules from deps stage
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  
  # Set environment variables for Next.js build
  ENV NEXT_TELEMETRY_DISABLED=1
  ENV NEXT_SHARP_PATH=/app/node_modules/sharp
  ENV BUILD_STANDALONE=true  
  
  # Run build
  RUN yarn build
  
  # -------------------------------
  # Production runner stage
  # -------------------------------
  FROM base AS runner
  WORKDIR /app
  
  ENV NODE_ENV=production
  
  # Create non-root user
  RUN addgroup --system --gid 1001 nodejs \
      && adduser --system --uid 1001 nextjs
  
  # Copy public assets
  COPY --from=builder /app/public ./public
  
  # Copy standalone output (server.js + minimal node_modules)
  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  
  # Switch to non-root user
  USER nextjs
  
  EXPOSE 3000
  
  CMD ["node", "server.js"]
  