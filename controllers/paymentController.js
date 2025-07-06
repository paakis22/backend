import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  //  Extract all variables from req.body
  const { amount, currency, name, subject } = req.body;

  try {
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      metadata: {
        name,      
        subject     
      }
    });

    await Payment.create({
      userId: req.user?.id || 'guest',
      name,
      subject,
      amount,
      currency,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error); // 👀 this will now show full info
    res.status(500).json({ error: 'Payment initiation failed', detail: error.message });
  }
};
