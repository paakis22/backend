import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  address: { type: String }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
