// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized: No token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now we can use req.user.id, req.user.role
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
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
