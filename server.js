import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import classRoutes from './routes/classRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // ✔ consistent naming

dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json

// Static file serving (for uploaded images, etc.)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/classrooms', classRoutes);
app.use('/api/upload', uploadRoutes); // Mount upload route last, for clarity

// Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
