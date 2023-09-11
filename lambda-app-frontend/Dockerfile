# Stage 1, building the app but not putting everything in the image
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# This will create a small folder on dist with everything to run in production
RUN npm run build
# EXPOSE 5173
# CMD ["npm", "run", "dev"]

# Stage 2, running another server with only the dist folder
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]