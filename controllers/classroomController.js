// import Classroom from '../models/Classroom.js'; 

// //createclass

// export const createClass = async (req, res) => {
//   try {
//     const newClass = await Classroom.create({
//       title: req.body.title,
//       module: req.body.module,
//       teacher: req.user.id,
//       duration: req.body.duration,
//       zoomLink: req.body.zoomLink,
//       image: req.file
//         ? {
//             url: req.file.path,
//             public_id: req.file.filename,
//           }
//         : undefined,
//     });

//     res.status(201).json(newClass);
//   } catch (err) {
//     console.error(" Error creating class:", err);
//     res.status(500).json({ error: 'Cannot create class' });
//   }
// };

// //get allclass

// export const getAllClasses = async (req, res) => {
//   try {
//     const classes = await Classroom.find().populate('teacher', 'name email');
//     res.json(classes);
//   } catch (err) {
//     console.error(" Get All Classes Error:", err);
//     res.status(500).json({ error: 'Error fetching classes' });
//   }
// }; 

// //get classby id

// export const getClassById = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id).populate('students teacher');
//     if (!classroom) return res.status(404).json({ error: 'Class not found' });
//     res.json(classroom);
//   } catch (err) {
//     console.error("Get Class By ID Error:", err);
//     res.status(500).json({ error: 'Error fetching class' });
//   }
// }; 


// //join class

// export const joinClass = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id);
//     if (!classroom) return res.status(404).json({ error: 'Class not found' });

//     if (!classroom.students.includes(req.user.id)) {
//       classroom.students.push(req.user.id);
//       await classroom.save();
//     }  

    

//     res.json({ message: 'Joined class successfully' });
//   } catch (err) {
//     console.error(" Join Class Error:", err);
//     res.status(500).json({ error: 'Could not join class' });
//   }
// }; 


// //update class

// export const updateClassroom = async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;
//   try {
//     const classroom = await Classroom.findById(id);
//     if (!classroom) {
//       return res.status(404).json({ error: 'Classroom not found' });
//     }

//     // Authorization: Admin or teacher of the class
//     if (req.user.role !== 'admin' && classroom.teacher?.toString() !== req.user.id) {
//       return res.status(403).json({ error: 'Not authorized to update this classroom' });
//     }

//     // Update fields only if provided
//     classroom.title = title || classroom.title;
//     classroom.description = description || classroom.description;
//     classroom.zoomLink = zoomLink || classroom.zoomLink;
//     if (req.file) classroom.Image = req.file?.path; // Update image if provided

//     await classroom.save();

//     res.status(200).json({ message: 'Classroom updated successfully', classroom });
//   } catch (error) {
//     console.error("  Update Classroom Error:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// //delete class

// export const deleteClassroom = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const classroom = await Classroom.findById(id);
//     if (!classroom) {
//       return res.status(404).json({ error: 'Classroom not found' });
//     }

//     // Authorization: Admin or teacher of the class
//     if (req.user.role !== 'admin' && classroom.teacher?.toString() !== req.user.id) {
//       return res.status(403).json({ error: 'Not authorized to delete this classroom' });
//     }

//     await Classroom.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Classroom deleted successfully' });
//   } catch (error) {
//     console.error("  Delete Classroom Error:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



// // controller
// export const getStudentJoinedClasses = async (req, res) => {
//   try {
//     const classes = await Classroom.find({ students: req.user.id }).populate('teacher', 'name email');
//     res.json(classes);
//   } catch (err) {
//     console.error("Get Student Classes Error:", err);
//     res.status(500).json({ error: 'Failed to fetch joined classes' });
//   }
// };




import Classroom from '../models/Classroom.js';

export const createClass = async (req, res) => {
  try {
    const newClass = await Classroom.create({
      title: req.body.title,
      module: req.body.module,
      duration: req.body.duration,
      zoomLink: req.body.zoomLink,
      teacher: req.user.id,
      image: req.file ? {
        url: req.file.path,
        public_id: req.file.filename,
      } : undefined,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create class' });
  }
};


// export const getAllClasses = async (req, res) => {
//   try {
//     const classes = await Classroom.find().populate('teacher', 'name email');
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching classes' });
//   }
// };




export const getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    if (!classroom) return res.status(404).json({ error: 'Class not found' });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching class' });
  }
};




export const joinClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (!classroom.students.includes(req.user.id)) {
      classroom.students.push(req.user.id);
      await classroom.save();
    }

    res.json({ message: 'Joined class successfully', zoomLink: classroom.zoomLink });
  } catch (err) {
    res.status(500).json({ error: 'Join failed' });
  }
};


// GET /api/class/my-classes
export const getMyClasses = async (req, res) => {
  try {
    const classes = await Classroom.find({ teacher: req.user.id }).populate('students', 'name email');
    res.json(classes);
  } catch (err) {
    console.error("Error fetching teacher's own classes:", err);
    res.status(500).json({ error: 'Failed to fetch your classes' });
  }
};





// export const updateClass = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const classroom = await Classroom.findById(id);
//     if (!classroom) return res.status(404).json({ error: 'Class not found' });

//     console.log('classroom.teacher:', classroom.teacher?.toString(), 'req.user.id:', req.user.id);

//     if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
//   return res.status(403).json({ error: 'Not authorized' });
// }
//     classroom.title = req.body.title || classroom.title;
//     classroom.module = req.body.module || classroom.module;
//     classroom.zoomLink = req.body.zoomLink || classroom.zoomLink;

//     await classroom.save();
//     res.json({ message: 'Class updated', classroom });
//   } catch (err) {
//     res.status(500).json({ error: 'Update failed' });
//   }
// };



// export const deleteClass = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id);
//     if (!classroom) return res.status(404).json({ error: 'Class not found' });

//     if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     await classroom.deleteOne();
//     res.json({ message: 'Class deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Delete failed' });
//   }
// };



export const updateClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    // Only teacher of the class or admin can update
    if (
      req.user.role !== 'teacher' &&
      (!classroom.teacher || classroom.teacher.toString() !== req.user.id)
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    classroom.title = req.body.title || classroom.title;
    classroom.module = req.body.module || classroom.module;
    classroom.zoomLink = req.body.zoomLink || classroom.zoomLink;
    // Update image if file is provided
    if (req.file) {
      classroom.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await classroom.save();
    res.json({ message: 'Class updated', classroom });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};




export const deleteClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    // Only teacher of the class or admin can delete
    if (
      req.user.role !== 'teacher' &&
      (!classroom.teacher || classroom.teacher.toString() !== req.user.id)
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await classroom.deleteOne();
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};



// GET /api/teachers/students/my
export const getMyStudents = async (req, res) => {
  try {
    const myClasses = await Classroom.find({ teacher: req.user.id }).populate('students', 'name email gender');
    const allStudents = myClasses.flatMap(cls => cls.students);
    res.json(allStudents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


// GET /api/classes/my-joined
export const getJoinedClasses = async (req, res) => {
  try {
    const joined = await Classroom.find({ students: req.user.id }).populate('teacher', 'name email');
    res.json(joined);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch joined classes' });
  }
};





// // controllers/classController.js
// export const getStudentClasses = async (req, res) => {
//   try {
//     const payments = await payments.find({ student: req.user.id, isPaid: true }).select('teacher');
//     const paidTeacherIds = payments.map(p => p.teacher);

//     const classes = await Classroom.find({ teacher: { $in: paidTeacherIds } }).populate('teacher', 'name email');
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching student classes' });
//   }
// };



// // GET /api/class/paid
// export const getPaidClasses = async (req, res) => {
//   try {
//     const studentId = req.user.id;

//     // Find subjects the student paid for
//     const payments = await payments.find({ student: studentId });

//     const paidTeacherIds = payments.map(p => p.teacher.toString());

//     // Find all classes created by those teachers
//     const classes = await Classroom.find({ teacher: { $in: paidTeacherIds } }).populate('teacher');

//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', detail: err.message });
//   }
// };


export const getAllClasses = async (req, res) => {
  try {
    let classes;

    // If user is a teacher, only show their own classes
    if (req.user.role === 'teacher') {
      classes = await classes.find({ teacher: req.user._id }).populate('teacher');
    } else {
      classes = await classes.find().populate('teacher');
    }

    res.json(classes);
  } catch (err) {
    console.error('❌ Error fetching classes:', err);
    res.status(500).json({ error: 'Server error' });
  }
};





export const getStudentPaidClasses = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Get all paid teachers for this student
    const accessList = await StudentAccess.find({
      student: studentId,
      paid: true
    });

    const allowedTeacherIds = accessList.map(a => a.teacher);

    // Fetch only classes from paid teachers
    const classes = await Class.find({
      teacher: { $in: allowedTeacherIds }
    }).populate('teacher');

    res.json(classes);
  } catch (err) {
    console.error('Error fetching student paid classes:', err);
    res.status(500).json({ error: 'Server error' });
  }
};