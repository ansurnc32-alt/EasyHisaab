# 13 Performance & Optimization Strategy

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Goal**: Sub 1-second load time on 3G networks (India tier 2/3).

## 1. Offline & Sync Strategy (The Core Engine)
- **Local First**: The React app reads *only* from IndexedDB (`Dexie.js`). It never waits for a network request to render the UI.
- **Background Sync**: We use the standard React `useEffect` or a dedicated Web Worker to poll the `SyncQueue` table in local storage.
  - If `navigator.onLine` is true, process the queue.
  - Send batched POST requests to `/api/v1/documents/sync`.
  - On success, mark as synced.

## 2. Caching & PWA Configuration
- **Service Worker**: We will use `Workbox` (via Vite PWA Plugin) to cache the React App shell (HTML, CSS, JS) on first load.
- **Result**: The second time the user opens the app, it loads instantly from disk, bypassing the network entirely.

## 3. Bundle Optimization (Frontend)
- **Lazy Loading**: Route-based code splitting. The `ReviewDocument` logic and heavy PDF generation libraries (`pdfmake`) are dynamically imported *only* when the user taps "Review". They are not loaded on the Home screen.
```javascript
const PdfGenerator = React.lazy(() => import('../utils/pdfGenerator'));
```
- **Compression**: Vite automatically compresses assets via Gzip/Brotli.
- **Image Optimization**: Avoid large PNGs. Use SVG icons exclusively for the UI.

## 4. Backend Optimization
- **Database Pagination**: The history endpoint (`/api/v1/documents/history`) must enforce limit/offset pagination (e.g., 20 documents per page) to prevent payload bloat.
- **Caching**: Template structures (Catering vs Rental) rarely change. Node.js will cache these in memory (or Redis later) rather than querying MongoDB on every request.

## CTO Benchmark Standards
- **LCP (Largest Contentful Paint)**: < 1.5 seconds.
- **TTI (Time to Interactive)**: < 2.0 seconds.
- **PDF Generation Time**: < 500ms on client device.
- **Total Bundle Size**: < 200KB (gzipped, excluding PDF library).
