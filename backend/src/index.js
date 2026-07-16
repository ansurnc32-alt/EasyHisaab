import connectDB from './db/index.js';
import { app } from './app.js';

import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("Node DNS:", dns.getServers());


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
