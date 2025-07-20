import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, 
  Gender: String,
  role: {
    type: String, 
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  hasPaid: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', userSchema);
export default User;




