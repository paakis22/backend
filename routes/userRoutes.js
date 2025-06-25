import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Admin only
router.get('/', protect, authorizeRoles('admin'), getAllUsers);

export default router;



