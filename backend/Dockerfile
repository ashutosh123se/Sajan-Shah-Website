FROM node:20

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies required for ts-node and tsconfig-paths)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV production
ENV PORT 5000

EXPOSE 5000

# Start the application using their default start script
CMD ["npm", "start"]
