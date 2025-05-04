import express from 'express';
import { protect } from '../middlewares/auth.js';
import { login, logout, verifyToken } from '../controllers/AuthController.js'; 

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/logout', logout); // No middleware needed for logout
router.get('/verify', protect, verifyToken); // Protect this route

export default router;