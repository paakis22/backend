import User from '../models/User.js';
import Payment from '../models/Payment.js'; 



// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Update a user by ID (Admin only)  

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};


// Delete a user by ID (Admin only)  

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Approve a teacher (Admin only) 

export const approveTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    teacher.status = 'approved';
    await teacher.save();

    res.status(200).json({ message: 'Teacher approved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    // Optionally verify admin role: e.g. if (req.user.role !== 'admin') return res.status(403)
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};