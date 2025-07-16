import express from 'express';
import { createQuestion, getQuestionsByModule } from '../controllers/questionController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('teacher'), createQuestion);
router.get('/module/:moduleId', protect, authorizeRoles('teacher', 'student', 'admin'), getQuestionsByModule);

export default router;
