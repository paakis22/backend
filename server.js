import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session'; 


import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
 import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import classRoutes from './routes/classRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // ✔ consistent naming
import teacherRoutes from './routes/teacherRoutes.js'; // ✔ added teacher routes
import studentRoutes from './routes/studentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; 
import passport from 'passport';     // google with login
import answer from './routes/answerRoutes.js'; // added answer routes
import question from './routes/questionRoutes.js'; // added question routes
import moduleRoutes from './routes/moduleRoutes.js'; // added module routes 
import webhookRoutes from './routes/webhookRoutes.js'; // added webhook routes

dotenv.config(); 
// require('dotenv').config(); 

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());

app.use('/api/payment', webhookRoutes);  // Route becomes: /api/payment/stripe-webhook

app.use(express.json()); // For parsing application/json  

// const session = require('express-session');



app.use(cors({  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc. 
  }));  
// Static file serving (for uploaded images, etc.)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/class', classRoutes);
app.use('/api/upload', uploadRoutes); // Mount upload route last, for clarity
app.use('/api/teachers', teacherRoutes); //  added teacher routes
app.use('/api/students', studentRoutes); // added student routes
app.use('/api/payment', paymentRoutes);


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));




app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/dashboard', (req, res) => {
  res.send(`Welcome ${req.user?.name}`);
});


// Root route
app.get('/', (req, res) => {
  res.send(' API is running...');
});

app.use('/api/answers', answer); // added answer routes
app.use('/api/questions', question); // added question routes
app.use('/api/modules', moduleRoutes); // added module routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
