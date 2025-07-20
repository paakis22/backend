import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Payment from '../models/Payment.js';


// Register function

export const register = async (req, res) => {
  const { name, email, password , Gender,role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password : hashedPassword,Gender, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }

   

};

// Login function

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    }); 

    let hasPaid = false;
    if (user.role === 'student') {
      const payment = await Payment.findOne({ userId: user._id, status: 'done' });
      hasPaid = !!payment;
    }

  
  
    if (user.role === 'teacher') {
      const payment = await Payment.findOne({ userId: user._id, status: 'done' });
      hasPaid = !!payment;
    }
    

     res.status(200).json({
      message: 'Login successful',
      token, // ✅ Return the token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        Gender: user.Gender,
        role: user.role,
        hasPaid // ✅ Include hasPaid status
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};  



// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     let hasPaid = false;

//     // 🔍 If teacher, get hasPaid from Teacher model
//     if (user.role === 'teacher') {
//       const teacher = await teacher.findOne({ userId: user._id });
//       hasPaid = teacher?.hasPaid || false;
//     } else {
//       // for student or admin
//       hasPaid = user.hasPaid || false;
//     }

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         hasPaid
//       }
//     });
//   } catch (err) {
//     console.error('❌ Login error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };