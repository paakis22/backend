import Classroom from '../models/Classroom.js';

export const createClass = async (req, res) => {
  try {
    const newClass = await Classroom.create({
      title: req.body.title,
      description: req.body.description,
      teacher: req.user.id
    });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create class' });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classroom.find().populate('teacher', 'name email');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching classes' });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('students teacher');
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

    res.json({ message: 'Joined class successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Could not join class' });
  }
};
