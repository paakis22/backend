import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String, // store image URL (e.g., Cloudinary)
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
