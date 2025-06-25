// routes/adminRoutes.js
import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { approveTeacher } from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router(); 



// Admin-only access
router.get('/', verifyToken, isAdmin, getAllUsers);
router.put('/:id', verifyToken, isAdmin, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);
router.put('/approve/:id', protect, authorizeRoles('admin'), approveTeacher);
export default router; 






