import express from 'express';
import { loginValidation, registerValidation } from '../middleware/validation.js';
import { register, login, logout, verifyToken, updateProfile, changePassword } from '../controllers/authController.js';      
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login);

router.post('/logout', logout);

router.post('/verify', auth, verifyToken);

router.put('/profile/:id', auth, updateProfile);

router.put('/change-password/:id', auth, changePassword);

export default router;
