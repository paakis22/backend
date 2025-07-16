import express from 'express';
import { submitAnswer, getAnswersByQuestion } from '../controllers/answerController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('student'), submitAnswer);
router.get('/question/:questionId', protect, authorizeRoles('teacher', 'admin'), getAnswersByQuestion);

export default router;
