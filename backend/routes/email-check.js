import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/check-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    res.json({
      success: true,
      exists: !!existingUser,
      message: existingUser ? 'Email already registered' : 'Email is available'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
