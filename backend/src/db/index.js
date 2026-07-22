import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

// ===== MongoDB Atlas (Disabled for Local Development) =====
// const atlasMongoUri = process.env.MONGODB_URI;
// The existing Atlas URI remains in the local environment file for later use.
// It is intentionally not passed to mongoose.connect() during local development.

// ===== Local MongoDB (Active) =====
// MongoDB Community Server is used locally to avoid Atlas SRV DNS dependencies.
const localMongoUri =
  process.env.LOCAL_MONGODB_URI ||
  `mongodb://127.0.0.1:27017/${process.env.DB_NAME || DB_NAME}`;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(localMongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `\nMongoDB connected! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
