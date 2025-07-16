
// models/Module.js

import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  pdf: {
    url: String,
    public_id: String
  }
}, { timestamps: true });

export default mongoose.model('Module', moduleSchema);
