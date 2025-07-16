import express from 'express';
import { createModule, getModules } from '../controllers/moduleController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('teacher'), createModule);
router.get('/', protect, authorizeRoles('teacher', 'student', 'admin'), getModules);

export default router;
