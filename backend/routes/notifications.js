import express from 'express';
import { auth } from '../middleware/auth.js';
import { emitUserNotification, emitSystemNotification } from '../socket/socketHandler.js';

const router = express.Router();

router.post('/test', auth, async (req, res, next) => {
  try {
    const { message, type } = req.body;
    
    emitUserNotification(
      req.user.userId,
      message || '🎉 Test notification! Your real-time notifications are working perfectly.',
      type || 'success'
    );

    res.json({
      success: true,
      message: 'Test notification sent!'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/broadcast', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can send broadcast notifications'
      });
    }

    const { message, type } = req.body;
    
    emitSystemNotification(
      message || '📢 System announcement: Everything is running smoothly!',
      type || 'info'
    );

    res.json({
      success: true,
      message: 'Broadcast notification sent to all users!'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
