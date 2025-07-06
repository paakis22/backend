// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  name: { type: String },
  subject: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  clientSecret: { type: String, required: true },
  paymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', paymentSchema);
