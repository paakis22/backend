// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  


export const protect = (req, res, next) => {
  console.log('🔐 protect middleware hit');
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];


   



  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.log('❌ Token invalid:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};


// Middleware to check if the user is an admin



export const verifyToken = (req, res, next) => {
  // your logic here
  next();
};

export const isAdmin = (req, res, next) => {
  // your logic here
  next();
};

export const authMiddleware = (req, res, next) => {
  // logic
};


