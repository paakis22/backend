import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController.js';
import upload from '../middleware/cloudinaryUpload.js'; // if you're using image upload

const router = express.Router();

router.post('/', upload.single('image'), createTeacher);
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.put('/:id', upload.single('image'), updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
