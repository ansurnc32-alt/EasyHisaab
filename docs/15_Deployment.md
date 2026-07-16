# 15 Deployment Plan

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Strategy**: Keep costs near zero for V1 MVP.

## 1. Environment Variables
Security is paramount. Variables must never be committed.
- **Backend (`.env`)**: `PORT`, `MONGO_URI`, `OPENAI_API_KEY`, `NODE_ENV`, `CLIENT_CORS_ORIGIN`.
- **Frontend (`.env`)**: `VITE_API_BASE_URL`.

## 2. CI/CD Pipeline (GitHub Actions)
- **Trigger**: Push to `main`.
- **Jobs**:
  1. **Lint & Test**: Run ESLint and Jest/Vitest. If tests fail, halt deployment.
  2. **Build Frontend**: Run `npm run build` for React/Vite.
  3. **Deploy Backend**: Push to Render/Railway.
  4. **Deploy Frontend**: Push to Vercel/Netlify.

## 3. Production Infrastructure (V1)
- **Frontend Hosting**: Vercel. Native support for Vite, instant global CDN invalidation, perfect for serving the PWA shell fast.
- **Backend Hosting**: Render (Web Service). Automatically builds and runs the Node.js Dockerfile.
- **Database**: MongoDB Atlas Serverless (M0 Free Tier initially, upgrading to M10 for daily backups).

## 4. Dockerization
To ensure "it works on my machine" translates to production, the backend will be containerized.

**`Dockerfile.backend` Preview:**
```dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 8080
CMD ["node", "src/server.js"]
```

## 5. Monitoring & Logging
- **Logging**: Use `Winston` in Node.js. In V1, log to `stdout` (captured by Render).
- **Monitoring**: 
  - UptimeRobot (pings health endpoint every 5 minutes).
  - Sentry (captures unhandled promise rejections in Backend and React crash boundaries).

## CTO Recommendation on Scaling
Do not pre-optimize infrastructure. A single Render instance ($7/mo) connected to Mongo Atlas can easily handle 10,000 MAUs due to our aggressive Offline-First architecture where 90% of user actions don't even hit the backend.
