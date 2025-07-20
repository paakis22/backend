import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  title: String,
  module: String,
  duration: String,
  zoomLink: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',  // Use exact model name with correct casing
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, { timestamps: true });

export default mongoose.model('Classroom', classroomSchema);
