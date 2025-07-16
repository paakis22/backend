import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentProfile,updateStudentProfilePicture,
  checkStudentOwnStatus
} from '../controllers/studentController.js';


import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/cloudinaryUpload.js';


const router = express.Router();




router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

router.get('/profile', protect, getStudentProfile);
router.put('/profile-picture', protect, upload.single('image'), updateStudentProfilePicture);
router.get('/check-status', (req, res, next) => {
  console.log('🛣️ Route reached: /check-status');
  next();
}, protect, checkStudentOwnStatus);


export default router;
