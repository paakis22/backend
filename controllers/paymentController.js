// import Stripe from 'stripe';
// import Payment from '../models/Payment.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentIntent = async (req, res) => {
//   //  Extract all variables from req.body
//   const { amount, currency, name, subject } = req.body;

//   try {
//     if (!amount || !currency) {
//       return res.status(400).json({ error: 'Amount and currency are required' });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency,
//       metadata: {
//         name,      
//         subject     
//       }
//     });

//     await Payment.create({
//       userId: req.user?.id || 'guest',
//       name,
//       subject,
//       amount,
//       currency,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//       status: 'pending'
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Stripe Error:', error); // 👀 this will now show full info
//     res.status(500).json({ error: 'Payment initiation failed', detail: error.message });
//   }
// };

import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, currency, name, subject } = req.body;

  try {
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' });
    }

    // ✅ Ensure auth and user ID are present
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized: Login required' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      metadata: {
        name,
        subject
      }
    });

    await Payment.create({
      userId, // ✅ actual user ID from token
      name,
      subject,
      amount,
      currency,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Payment initiation failed', detail: error.message });
  }
};


// export const markPaymentAsDone = async (req, res) => {
//   try {
//     const { paymentIntentId } = req.body;

//     const payment = await Payment.findOne({ paymentIntentId });
//     if (!payment) return res.status(404).json({ error: 'Payment not found' });

//     payment.status = 'done';
//     await payment.save();

//     res.json({ message: 'Payment marked as done' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating payment status' });
//   }
// };
