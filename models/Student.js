// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   gender: { type: String },
//   address: { type: String }
// }, { timestamps: true });

// export default mongoose.model('Student', studentSchema);



import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: String,
  email: String,
  gender: String,
  address: String,
  hasPaid: { type: Boolean, default: false } // ✅ Track payment status
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
