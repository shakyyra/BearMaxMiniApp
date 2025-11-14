FROM node:20-alpine

WORKDIR /app/apps/web

ENV NODE_ENV=development \
    WEB_PORT=3000 \
    VITE_API_BASE_URL=http://api:8000/api/v1 \
    VITE_DEFAULT_ACCOUNT_ID=1

COPY apps/web/package*.json ./
RUN npm install

COPY apps/web .

EXPOSE 3000

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port ${WEB_PORT}"]
