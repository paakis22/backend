import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  joinClass,
  updateClassroom
} from '../controllers/classController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import upload from '../middleware/cloudinaryUpload.js'; // for image upload

const router = express.Router();

// Create class with image upload
router.post(
  '/create',
  protect,
  authorizeRoles('admin'),
  upload.single('image'),
  createClass
);

// Get all classes
router.get('/', protect, getAllClasses);

// Get class by ID
router.get('/:id', protect, getClassById);

// Join a class
router.post('/:id/join', protect, authorizeRoles('student'), joinClass);

// Update class
router.put('/:id', protect, authorizeRoles('admin'), upload.single('image'), updateClassroom);

export default router;
