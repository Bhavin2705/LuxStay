import express from 'express';
import User from '../models/User.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', [auth, adminAuth], async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', [auth, adminAuth], async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/ban', [auth, adminAuth], async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot ban admin users' 
      });
    }

    user.banned = true;
    await user.save();

    const { password, ...userData } = user.toObject();

    res.json({
      success: true,
      message: 'User banned successfully',
      data: userData
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/unban', [auth, adminAuth], async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.banned = false;
    await user.save();

    const { password, ...userData } = user.toObject();

    res.json({
      success: true,
      message: 'User unbanned successfully',
      data: userData
    });
  } catch (error) {
    next(error);
  }
});

export default router;
