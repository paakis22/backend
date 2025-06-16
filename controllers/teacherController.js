import Teacher from '../models/Teacher.js';

// Create
export const createTeacher = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const teacher = await Teacher.create({
      name,
      email,
      bio,
      image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : undefined,
    });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create teacher' });
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
