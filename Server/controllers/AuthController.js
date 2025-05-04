import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/User.js';
import dotenv from 'dotenv';
dotenv.config();


// Environment variables should be properly set up in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

/**
 * Login controller - authenticates user and returns JWT token
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ username }).select('+password');
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    // Send response
    res.status(200).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

/**
 * Verify token controller - validates JWT and returns user info
 */
export const verifyToken = async (req, res) => {
  try {
    // User will be attached to req by the auth middleware
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during token verification' 
    });
  }
};

export const logout = async (req, res) => {
  try {
    // For stateless JWT auth, server-side logout is mostly for logging purposes
    // We could also add the token to a blacklist if needed
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during logout' 
    });
  }
};