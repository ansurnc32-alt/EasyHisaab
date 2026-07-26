import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './routes/auth.routes.js';
import billRouter from './routes/bill.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/api/v1/healthcheck', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EasyHisaab API is running',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/bills', billRouter);

app.use(errorHandler);

export { app };
