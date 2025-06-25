import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  module: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  duration: String,
  image: {
    url: String,
    public_id: String,
  },
 

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Classroom', classSchema);
