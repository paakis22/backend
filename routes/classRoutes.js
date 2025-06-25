import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  joinClass,
  updateClassroom
} from '../controllers/classController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../middleware/cloudinaryUpload.js'; // for image upload 


const router = express.Router();

// Create class with image upload
router.post(
  '/create',
  protect,
  authorizeRoles('teacher'),
  upload.single('image'),
  createClass
);

// Get all classes
router.get('/', protect,authorizeRoles('user'), getAllClasses);

// Get class by ID
router.get('/:id', protect,authorizeRoles('user'), getClassById);

// Join a class
router.post('/:id/join', protect, authorizeRoles('student'), joinClass);

// Update class
router.put('/:id', protect, authorizeRoles('teacher'), upload.single('image'), updateClassroom);



export default router;


