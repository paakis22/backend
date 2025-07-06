
// models/Teacher.js
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  gender: { type: String },
  bio: { type: String },
  address: { type: String },
  resume: {
    url: String,
    public_id: String,
  },
  image: {
    url: String,
    public_id: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
