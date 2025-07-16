import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController.js';



import { checkTeacherProfile } from '../controllers/teacherController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';



import multer from 'multer';
import { storage } from '../middleware/cloudinaryUpload.js'; // ✅ Make sure the filename is correct



const upload = multer({ storage });

const router = express.Router();

// CREATE: Teacher with image and resume

router.post(
  '/',
  protect, // <-- add this here
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  createTeacher
);

//  Get all teachers
router.get('/', getAllTeachers);

// Get single teacher by ID
router.get('/:id', getTeacherById);

// Teacher profile image
router.put('/:id', upload.single('image'), updateTeacher);

//  DELETE: Teacher
router.delete('/:id', deleteTeacher);




router.get('/check-profile', protect, authorizeRoles('teacher'), checkTeacherProfile);




// router.get('/students/my', protect, authorizeRoles('teacher'), getMyStudents);





export default router;
