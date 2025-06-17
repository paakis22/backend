import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  image: {
    url: {
      type: String,
      default: '',
    },
    public_id: {
      type: String,
      default: '',
    },
  },
}, {
  timestamps: true // Automatically adds createdAt & updatedAt
});

export default mongoose.model('Teacher', teacherSchema);
