import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  joinClass
} from '../controllers/classController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('teacher'), createClass);
router.get('/', protect, getAllClasses);
router.get('/:id', protect, getClassById);
router.post('/:id/join', protect, authorizeRoles('student'), joinClass);

export default router;
