// import mongoose from 'mongoose';

// const classSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   module: String,
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   duration: String,
//   zoomLink: String,
//   image: {
//     url: String,
//     public_id: String,
//   },
 

//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Classroom', classSchema);
 





         




import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  title: String,
  module: String,
  duration: String,
  zoomLink: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  image: {
    url: String,
    public_id: String,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'

  }],

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Classroom', classroomSchema);





