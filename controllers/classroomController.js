import Classroom from '../models/Classroom.js';

// Create a new class
export const createClass = async (req, res) => {
  try {
    const newClass = await Classroom.create({
      title: req.body.title,
      module: req.body.module,
      duration: req.body.duration,
      zoomLink: req.body.zoomLink,
      teacher: req.user.id,  // assuming req.user.id contains teacher's ObjectId
      image: req.file ? {
        url: req.file.path,
        public_id: req.file.filename,
      } : undefined,
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error('Error creating class:', err);
    res.status(500).json({ error: 'Cannot create class' });
  }
};

// Get all classes (if teacher, only their classes, else all)
export const getAllClasses = async (req, res) => {
  try {
    let classes;
    if (req.user.role === 'teacher') {
      classes = await Classroom.find({ teacher: req.user.id }).populate('teacher', 'name email');
    } else {
      classes = await Classroom.find().populate('teacher', 'name email');
    }
    res.json(classes);
  } catch (err) {
    console.error('Error fetching classes:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get class by ID with teacher and students populated
export const getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    if (!classroom) return res.status(404).json({ error: 'Class not found' });
    res.json(classroom);
  } catch (err) {
    console.error('Error fetching class:', err);
    res.status(500).json({ error: 'Error fetching class' });
  }
};

// Student join a class
export const joinClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    const studentId = req.user.id;  // from auth middleware

    // Check if student already joined
    if (!classroom.students.some(s => s.toString() === studentId)) {
      classroom.students.push(studentId);
      await classroom.save();
    }
    console.log('req.user:', req.user);

    return res.json({ message: 'Joined class successfully', zoomLink: classroom.zoomLink });
  } catch (error) {
    console.error('Join class error:', error);

    res.status(500).json({ error: 'Could not join class' });
  }
};

// Update class (only teacher of the class or admin)
export const updateClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    classroom.title = req.body.title || classroom.title;
    classroom.module = req.body.module || classroom.module;
    classroom.duration = req.body.duration || classroom.duration;
    classroom.zoomLink = req.body.zoomLink || classroom.zoomLink;

    if (req.file) {
      classroom.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await classroom.save();
    res.json({ message: 'Class updated', classroom });
  } catch (err) {
    console.error('Update class error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
};

// Delete class (only teacher of the class or admin)
export const deleteClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await classroom.deleteOne();
    res.json({ message: 'Class deleted' });
  } catch (err) {
    console.error('Delete class error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

// Get all classes joined by the logged-in student
export const getJoinedClasses = async (req, res) => {
  try {
    console.log('Fetching joined classes for user:', req.user.id);
    const classes = await Classroom.find({ students: req.user.id }).populate('teacher', 'name email');
    console.log('Found joined classes:', classes.length);
    res.json(classes);
  } catch (err) {
    console.error('Error fetching joined classes:', err);
    res.status(500).json({ error: 'Failed to fetch joined classes' });
  }
};

// classroomController.js

export const getMyClasses = async (req, res) => {
  try {
    const classes = await Classroom.find({ teacher: req.user.id }).populate('students', 'name email');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your classes' });
  }
};
// classroomController.js

export const getMyStudents = async (req, res) => {
  try {
    const myClasses = await Classroom.find({ teacher: req.user.id }).populate('students', 'name email gender');
    const allStudents = myClasses.flatMap(cls => cls.students);
    res.json(allStudents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

