// import express from 'express';
// import {
//   createClass,
//   getAllClasses,
//   getClassById,
//   joinClass,
//   updateClassroom
// } from '../controllers/classController.js';

// import { protect } from '../middleware/authMiddleware.js';
// import { authorizeRoles } from '../middleware/authMiddleware.js';
// import upload from '../middleware/cloudinaryUpload.js'; // for image upload 
// import { getStudentJoinedClasses } from '../controllers/classController.js';



// const router = express.Router();

// // Create class with image upload
// router.post(
//   '/create',
//   protect,
//   authorizeRoles('teacher'),
//   upload.single('image'),
//   createClass
// );

// // Get all classes
// router.get('/', protect,authorizeRoles('user,admin'), getAllClasses);

// // Get class by ID
// router.get('/:id', protect,authorizeRoles('user'), getClassById);

// // Join a class
// router.post('/:id/join', protect, authorizeRoles('student'), joinClass);

// // Update class
// router.put('/:id', protect, authorizeRoles('teacher'), upload.single('image'), updateClassroom);

// // router.get('/joined/me', protect, authorizeRoles('student'), getStudentJoinedClasses);

// // Add this import if not already added

// // Register the new route
// router.get(
//   '/joined/me',
//   protect,
//   authorizeRoles('student'),
//   getStudentJoinedClasses
// );



// export default router;





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
  getMyClasses,
  getStudentPaidClasses,
  // getStudentPaidClasses
  // getStudentClasses
} from '../controllers/classroomController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getMyStudents } from '../controllers/classroomController.js';
import { getJoinedClasses } from '../controllers/classroomController.js';


import { authMiddleware } from '../middleware/authMiddleware.js';

getStudentPaidClasses



const router = express.Router();
const upload = multer({ storage });

// Create class (teacher)
router.post('/', protect, authorizeRoles('teacher'), upload.single('image'), createClass);

// Get all classes (all)
router.get('/', protect, authorizeRoles('teacher', 'admin', 'student'), getAllClasses);

// Get single class (all)
router.get('/:id', protect, authorizeRoles('teacher', 'admin', 'student'), getClassById);

// Join class (student)
router.post('/:id/join', protect, authorizeRoles('student'), joinClass);

// Update class (teacher or admin)
router.put('/:id', protect, authorizeRoles('teacher', 'admin'), upload.single('image'), updateClass);

// Delete class (teacher or admin)
router.delete('/:id', protect, authorizeRoles('teacher', 'admin'), deleteClass);

router.get('/teachers/students/my', protect, authorizeRoles('teacher'), getMyStudents);

  router.get('/classes/my-joined', protect, authorizeRoles('student'), getJoinedClasses);
  
  router.get('/my-classes', protect, authorizeRoles('teacher'), getMyClasses);

  router.get('/student/classes', protect, authorizeRoles('student'), getStudentPaidClasses);
  router.get('/paid', authMiddleware, getAllClasses);


  // router.get('/student/classes', protect, getStudentPaidClasses);outer.get('/student/classes', protect, getStudentPaidClasses);


export default router;
