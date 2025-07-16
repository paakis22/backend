import Teacher from '../models/Teacher.js';

// controllers/teacherController.js

export const createTeacher = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ Use authenticated user's ID

    const { name, email, bio, gender, address, subject } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user ID found in token' });
    }

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const newTeacher = await Teacher.create({
      userId, // ✅ Now set correctly
      name,
      email,
      subject,
      bio,
      gender,
      address,
      resume: {
        url: req.files?.resume?.[0]?.path || '',
        public_id: req.files?.resume?.[0]?.filename || ''
      },
      image: {
        url: req.files?.image?.[0]?.path || '',
        public_id: req.files?.image?.[0]?.filename || ''
      },
    });

    res.status(201).json({ message: 'Profile submitted. Awaiting admin approval.', teacher: newTeacher });

  } catch (err) {
    console.error("Teacher Creation Error:", err.message);
    res.status(500).json({ error: 'Cannot create teacher', detail: err.message });
  }
};



// Get All
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching teachers' });
  }
};

// Get By ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching teacher' });
  }
};

// Update
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    const { name, email, bio } = req.body;
    if (req.file) teacher.avatar = req.file.path;

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.bio = bio || teacher.bio;

    await teacher.save();
    res.json({ message: 'Updated', teacher });
  } catch (err) {
    res.status(500).json({ error: 'Error updating teacher' });
  }
};

// Delete
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting teacher' });
  }
};




// // controller/teacherController.js
// export const getMyStudents = async (req, res) => {
//   try {
//     const classes = await Classroom.find({ teacher: req.user.id }).populate({
//       path: 'students',
//       select: 'name email gender', // what you want to show
//     });

//     const students = classes.flatMap(cls => cls.students); // combine all students

//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch students' });
//   }
// };




// export const checkTeacherProfile = async (req, res) => {
//   try {
//     const teacher = await Teacher.findOne({ userId: req.user.id });
//     if (!teacher) {
//       return res.json({ hasProfile: false });
//     }
//     return res.json({ hasProfile: true, hasPaid: teacher.hasPaid });
//   } catch (err) {
//     console.error('Profile check error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };




export const checkTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
      return res.json({ hasProfile: false });
    }

    return res.json({
      hasProfile: true,
      hasPaid: teacher.hasPaid
    });
  } catch (err) {
    console.error('Profile check error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};




// export const checkTeacherProfile = async (req, res) => {
//   try {
//     console.log('👀 req.user.id:', req.user?.id); // Check user id received

//     const teacher = await Teacher.findOne({ userId: req.user.id });
//     console.log('🔎 teacher found:', teacher);

//     if (!teacher) {
//       return res.json({ hasProfile: false });
//     }

//     return res.json({ hasProfile: true, hasPaid: teacher.hasPaid });
//   } catch (err) {
//     console.error('🔥 checkTeacherProfile error:', err.message);
//     res.status(500).json({ error: 'Error fetching teacher', detail: err.message });
//   }
// };
