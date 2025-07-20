
// // models/Teacher.js
// import mongoose from 'mongoose';

// const teacherSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   subject: { type: String, required: true },
//   gender: { type: String },
//   bio: { type: String },
//   address: { type: String },
//   resume: {
//     url: String,
//     public_id: String,
//   },
//   image: {
//     url: String,
//     public_id: String,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'approved'],
//     default: 'pending',
//   },
// }, { timestamps: true });

// export default mongoose.model('Teacher', teacherSchema);



import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  bio: { type: String },
  gender: { type: String },
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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  hasPaid: { type: Boolean, default: false }, // ✅ track payment status
  approvalEmailSent: {
    type: Boolean,
    default: false,
  },
   fee: {
    type: Number,
    required: true,
    default: 1000, // LKR or any value
  }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
