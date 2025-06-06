
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express(); 
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 



