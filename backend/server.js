import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotels.js';
import bookingRoutes from './routes/bookings.js';
import userRoutes from './routes/users.js';
import notificationRoutes from './routes/notifications.js';
import emailCheckRoutes from './routes/email-check.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initializeSocket } from './socket/socketHandler.js';

dotenv.config();

connectDB();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

const io = initializeSocket(server);
app.set('io', io);

app.use(helmet());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', process.env.CORS_ORIGIN].filter(Boolean),
  credentials: true
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development' && req.path.includes('/auth/verify')
});

app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', emailCheckRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LuxStay API is running' });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Environment: ' + process.env.NODE_ENV);
  console.log('API: http://localhost:' + PORT + '/api');
  console.log('WebSocket server ready');
});

export default app;
