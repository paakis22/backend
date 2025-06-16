


// controllers/paymentController.js
import stripe from '../utils/stripe.js';

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      metadata: { integration_check: 'accept_a_payment', userId: req.user.id },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};
