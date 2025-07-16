import Student from '../models/Student.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';



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





export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateStudentProfilePicture = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.profileImage = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    await student.save();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
};



export const checkStudentOwnStatus = async (req, res) => {

  try {
    console.log('🔍 checkStudentStatus called');
  } catch (err) {
    console.error('💥 Fatal error BEFORE try block:', err);
  }

  try {
    console.log('🔍 checkStudentStatus called');
    console.log('req.user:', req.user);

    if (!req.user || !req.user.id) {
      console.log('❌ No user info found in req.user');
      return res.status(401).json({ error: 'Unauthorized: No user ID' });
    }

    const userId = req.user.id;
    console.log('Looking for payments for userId:', userId);

    const payment = await Payment.findOne({ userId, status: 'done' });
    console.log('✅ Payment found:', payment);

    const hasPaid = !!payment;

    console.log('Updating user hasPaid to:', hasPaid);
    const updatedUser = await User.findByIdAndUpdate(userId, { hasPaid }, { new: true });
    console.log('✅ Updated User:', updatedUser);

    const studentUser = await User.findOne({ _id: userId, role: 'student' });
    console.log('✅ Student user:', studentUser);

    if (!studentUser) {
      console.log('❌ No student found for ID:', userId);
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ hasPaid, student: studentUser });
  } catch (err) {
    console.error('❌ Error in checkStudentOwnStatus:', err);
    res.status(500).json({
      error: 'Error fetching student',
      detail: err.message,
      stack: err.stack
    });
  }
};
