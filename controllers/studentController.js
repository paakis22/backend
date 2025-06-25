import Student from '../models/Student.js';

// CREATE
export const createStudent = async (req, res) => {
  try {
    const { name, email, gender, address } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const newStudent = await Student.create({ name, email, gender, address });

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create student', detail: err.message });
  }
};

// READ ALL
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// READ ONE
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// UPDATE
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.gender = req.body.gender || student.gender;
    student.address = req.body.address || student.address;

    await student.save();
    res.json({ message: 'Student updated', student });
  } catch (err) {
    res.status(500).json({ error: 'Error updating student' });
  }
};

// DELETE
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.deleteOne();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting student' });
  }
};
