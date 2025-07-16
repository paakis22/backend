
import express from 'express';
// import { createPaymentIntent,markPaymentAsDone } from '../controllers/paymentController.js';
import { createPaymentIntent} from '../controllers/paymentController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-intent',protect, createPaymentIntent);
// router.post('/mark-done', protect, markPaymentAsDone);                          




export default router;       
