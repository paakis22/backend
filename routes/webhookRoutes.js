// routes/webhookRoutes.js (or similar)
import express from 'express';
import { stripeWebhookHandler } from '../controllers/webhookController.js';

const router = express.Router();

router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }), // MUST be raw for Stripe signature verification
  stripeWebhookHandler

  
);

export default router;
