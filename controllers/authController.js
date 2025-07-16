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
    res.status(500).json({ error: 'Server error' });
  }
};




// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   const isMatch = await user.matchPassword(password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

//   let hasPaid = false;

//   if (user.role === 'student' || user.role === 'teacher') {
//     const payment = await Payment.findOne({ user: user._id, status: 'paid' });
//     hasPaid = !!payment;
//   }

//   const token = generateToken(user._id);

//   res.json({
//     user: {
//       _id: user._id,
//       role: user.role,
//       hasPaid // 👉 include this field explicitly in API response!
//     },
//     token
//   });
// };




// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   const isMatch = await user.matchPassword(password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

//   let hasProfile = false;
//   let hasStudentProfile = false;

//   if (user.role === 'teacher') {
//     const profile = await TeacherProfile.findOne({ user: user._id });
//     hasProfile = !!profile;
//   }

//   if (user.role === 'student') {
//     const studentProfile = await studentProfile.findOne({ user: user._id });
//     hasStudentProfile = !!studentProfile;
//   }

//   const token = generateToken(user._id);

//   res.json({
//     user: {
//       _id: user._id,
//       role: user.role,
//       hasProfile,
//       hasStudentProfile
            
//     },
//     token
//   });
// };
