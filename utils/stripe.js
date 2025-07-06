utils/stripe.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // use your actual Stripe secret key

export default stripe;



