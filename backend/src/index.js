import connectDB from './db/index.js';
import { app } from './app.js';

// ===== MongoDB Atlas (Disabled for Local Development) =====
// import dns from 'node:dns';
// dns.setServers(['8.8.8.8', '1.1.1.1']);
// Atlas SRV DNS overrides are intentionally disabled because local development
// uses MongoDB Community Server and does not require external DNS resolution.

// ===== Local MongoDB (Active) =====
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
