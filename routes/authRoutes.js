import express from 'express';
import { register, login } from '../controllers/authController.js';
import passport from 'passport';



const router = express.Router();

router.post('/register', register);
router.post('/login', login); 



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard' // or send token from here
  })
);


export default router;



