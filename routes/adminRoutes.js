// routes/adminRoutes.js
import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { approveTeacher,rejectTeacher } from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllPayments } from '../controllers/adminController.js'; 
const router = express.Router(); 



// Admin-only access
router.get('/', verifyToken, isAdmin, getAllUsers);
router.put('/:id', verifyToken, isAdmin, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);
router.put('/approve/:id', protect, authorizeRoles('admin'), approveTeacher);
router.put('/reject/:id', protect, authorizeRoles('admin'), rejectTeacher);

router.get('/payments', isAdmin, getAllPayments); // Optional middleware





// router.put('/approve/:id', protect, authorizeRoles('admin'), approveTeacher);



export default router; 


// // Example: routes/admin.js
// router.put('/approve/:id', protect, authorizeRoles('admin'), async (req, res) => {
//   try {
//     const teacher = await User.findById(req.params.id);
//     if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

//     teacher.status = 'approved';
//     await teacher.save();
//     res.json({ message: 'Teacher approved!' });
//   } catch (err) {
//     res.status(500).json({ error: 'Approval failed' });
//   }
// });




