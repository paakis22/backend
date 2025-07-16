import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  response: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Answer', answerSchema);
