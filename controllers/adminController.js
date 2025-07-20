import User from '../models/User.js';
import Payment from '../models/Payment.js'; 
import Teacher from '../models/Teacher.js';
import { sendEmail } from '../utils/sendEmail.js';




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

// export const approveTeacher = async (req, res) => {
//   try {
//     const teacher = await teacher.findById(req.params.id);
//     if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

//     teacher.status = 'approved';
//     await teacher.save();

//     res.status(200).json({ message: 'Teacher approved' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };


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




// Approve a teacher (Admin only)



// controllers/adminController.js
// controllers/adminController.js


// export const approveTeacher = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const teacher = await Teacher.findByIdAndUpdate(
//       id,
//       { status: 'approved' },
//       { new: true }
//     );

//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Email HTML content
//     const emailContent = `
//       <h2>Hello ${teacher.name},</h2>
//       <p>Your teacher profile has been <strong style="color:green;">approved</strong> by the admin.</p>
//       <p>You can now log in and start creating your classes on <strong>Clasio</strong>.</p>
//       <br/>
//       <p>Best regards,<br/>Clasio Team</p>
//     `;

//     await sendEmail(
//       teacher.email,
//       `Your Clasio Teacher Profile is Approved, ${teacher.name}!`,
//       emailContent
//     );

//     res.json({ message: '✅ Teacher approved and email sent' });
//   } catch (err) {
//     console.error('❌ Error in approveTeacher:', err.message);
//     res.status(500).json({ error: 'Error approving teacher', detail: err.message });
//   }
// };


     export const approveTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    console.log('Approving teacher:', teacher);

    // ✅ Email HTML with a styled "Proceed to Payment" button
    const emailContent = `
      <h2>Hello ${teacher.name},</h2>
      <p>Your teacher profile has been <strong style="color:green;">approved</strong> by the admin.</p>
      <p>You can now log in and proceed with the payment to access your dashboard on <strong>Clasio</strong>.</p>

      <a href="http://localhost:5173/payment?role=teacher"
         style="
           display: inline-block;
           padding: 12px 24px;
           background-color: #28a745;
           color: white;
           text-decoration: none;
           border-radius: 6px;
           font-weight: bold;
           margin-top: 20px;
         ">
         💳 Proceed to Payment
      </a>

      <br/><br/>
      <p>Best regards,<br/>Clasio Team</p>
    `;

    if (!teacher.email) {
      return res.status(400).json({ error: 'Teacher email not found, cannot send approval email.' });
    }

    try {
      await sendEmail(
        teacher.email,
        `Your Clasio Teacher Profile is Approved, ${teacher.name}!`,
        emailContent
      );
      teacher.approvalEmailSent = true;
      await teacher.save();

      res.json({ message: '✅ Teacher approved and email sent' });
    } catch (emailErr) {
      console.error('❌ Error sending approval email:', emailErr.message);
      res.status(200).json({ message: 'Teacher approved, but email not sent', error: emailErr.message });
    }
  } catch (err) {
    console.error('❌ Error in approveTeacher:', err.message);
    res.status(500).json({ error: 'Error approving teacher', detail: err.message });
  }
};






// export const approveTeacher = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const teacher = await Teacher.findByIdAndUpdate(
//       id,
//       { status: 'approved' },
//       { new: true }
//     );

//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Log teacher info for debugging
//     console.log('Approving teacher:', teacher);

//     // Email HTML content
//     const emailContent = `
//       <h2>Hello ${teacher.name},</h2>
//       <p>Your teacher profile has been <strong style="color:green;">approved</strong> by the admin.</p>
//       <p>You can now log in and start creating your classes on <strong>Clasio</strong>.</p>
//       <br/>
//       <p>Best regards,<br/>Clasio Team</p>
//     `;

//     // Check if email exists
//     if (!teacher.email) {
//       return res.status(400).json({ error: 'Teacher email not found, cannot send approval email.' });
//     }

//     try {
//       await sendEmail(
//         teacher.email,
//         `Your Clasio Teacher Profile is Approved, ${teacher.name}!`,
//         emailContent
//       );
//       teacher.approvalEmailSent = true; // Mark email as sent
//       await teacher.save(); // Save the updated teacher document
//       res.json({ message: '✅ Teacher approved and email sent' });
//     } catch (emailErr) {
//       console.error('❌ Error sending approval email:', emailErr.message);
//       res.status(200).json({ message: 'Teacher approved, but email not sent', error: emailErr.message });
//     }
//   } catch (err) {
//     console.error('❌ Error in approveTeacher:', err.message);
//     res.status(500).json({ error: 'Error approving teacher', detail: err.message });
//   }
// };




export const rejectTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Log teacher info for debugging
    console.log('Rejecting teacher:', teacher);

    // Email content for rejection
    const emailContent = `
      <h2>Hello ${teacher.name},</h2>
      <p>We regret to inform you that your teacher profile has been <strong style="color:red;">rejected</strong> by the admin.</p>
      <p>If you believe this was a mistake or wish to reapply, please revise your profile and try again.</p>
      <br/>
      <p>Regards,<br/>Clasio Team</p>
    `;

    // Check if email exists
    if (!teacher.email) {
      return res.status(400).json({ error: 'Teacher email not found, cannot send rejection email.' });
    }

    try {
      await sendEmail(
        teacher.email,
        `Your Clasio Teacher Profile Was Rejected`,
        emailContent
      );
      res.json({ message: '❌ Teacher rejected and email sent' });
    } catch (emailErr) {
      console.error('❌ Error sending rejection email:', emailErr.message);
      res.status(200).json({ message: 'Teacher rejected, but email not sent', error: emailErr.message });
    }
  } catch (err) {
    console.error('❌ Error in rejectTeacher:', err.message);
    res.status(500).json({ error: 'Error rejecting teacher', detail: err.message });
  }
};







