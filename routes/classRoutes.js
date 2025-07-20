import express from 'express';
import multer from 'multer';
import { storage } from '../middleware/cloudinaryUpload.js';

import {
  createClass,
  getAllClasses,
  getClassById,
  joinClass,
  updateClass,
  deleteClass,
  getJoinedClasses,
  getMyClasses,
  getMyStudents,
} from '../controllers/classroomController.js';

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// Create class (teacher only)
router.post(
  '/',
  protect,
  authorizeRoles('teacher'),
  upload.single('image'),
  createClass
);

// Get all classes (teacher, admin, student)
router.get(
  '/',
  protect,
  authorizeRoles('teacher', 'admin', 'student'),
  getAllClasses
);

// Get all students for the logged-in teacher
router.get(
  '/teachers/students/my',
  protect,
  authorizeRoles('teacher'),
  getMyStudents
);

// Get classes joined by logged-in student
router.get(
  '/classes/my-joined',
  protect,
  authorizeRoles('student'),
  getJoinedClasses
);

// Get classes created by logged-in teacher
router.get(
  '/my-classes',
  protect,
  authorizeRoles('teacher'),
  getMyClasses
);

// Get classes student paid for
// router.get(
//   '/paid',
//   protect,
//   authorizeRoles('student'),
//   getStudentPaidClasses
// );

// Get single class by ID (all roles)
router.get(
  '/:id',
  protect,
  authorizeRoles('teacher', 'admin', 'student'),
  getClassById
);

// Student join class
router.post(
  '/:id/join',
  protect,
  authorizeRoles('student'),
  joinClass
);

// Update class (teacher or admin)
router.put(
  '/:id',
  protect,
  authorizeRoles('teacher', 'admin'),
  upload.single('image'),
  updateClass
);

// Delete class (teacher or admin)
router.delete(
  '/:id',
  protect,
  authorizeRoles('teacher', 'admin'),
  deleteClass
);

export default router;
