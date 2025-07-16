


// import Stripe from 'stripe';
// import Payment from '../models/Payment.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhookHandler = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // ✅ Process specific events
//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object;
//     try {
//       const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id });
//       if (payment) {
//         payment.status = 'done';
//         await payment.save();
//         console.log(`✅ Payment ${paymentIntent.id} marked as done.`);
//       } else {
//         console.log(`⚠️  Payment with ID ${paymentIntent.id} not found.`);
//       }
//     } catch (error) {
//       console.error('❌ DB update error:', error);
//     }
//   } else {
//     console.log(`🔔 Unhandled event type: ${event.type}`);
//   }

//   res.json({ received: true });
// };

import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import User from '../models/User.js'; // ✅ Import User model
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    try {
      // ✅ 1. Update Payment record
      const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id });
      if (payment) {
        payment.status = 'done';
        await payment.save();
        console.log(`✅ Payment ${paymentIntent.id} marked as done.`);

        // ✅ 2. Also update User hasPaid status
        const user = await User.findById(payment.userId);
        if (user) {
          user.hasPaid = true;
          await user.save();
          console.log(`✅ User ${user._id} marked as hasPaid: true`);
        } else {
          console.log(`❌ User not found for ID ${payment.userId}`);
        }

      } else {
        console.log(`⚠️  Payment with ID ${paymentIntent.id} not found.`);
      }
    } catch (error) {
      console.error('❌ DB update error:', error);
    }
  } else {
    console.log(`🔔 Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
