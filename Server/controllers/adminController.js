import Admin from '../Models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

/**
 * Controller for admin registration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with admin data or error
 */
export const registerAdmin = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      contactNumber,
      adminId,
      designation,
      permissions = ['all'],
      address = {}
    } = req.body;

    // Check if the user already exists
    const existingUser = await Admin.findOne({ 
      $or: [{ email }, { username }, { adminId }] 
    });
    
    if (existingUser) {
      let field = '';
      if (existingUser.email === email) field = 'Email';
      else if (existingUser.username === username) field = 'Username';
      else if (existingUser.adminId === adminId) field = 'Admin ID';
      
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists` 
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      adminId,
      designation,
      permissions,
      address,
      role: 'admin'
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();

    // Create JWT token
    const payload = {
      user: {
        id: savedAdmin._id,
        role: savedAdmin.role
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with token
    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        firstName: savedAdmin.firstName,
        lastName: savedAdmin.lastName,
        adminId: savedAdmin.adminId,
        designation: savedAdmin.designation,
        role: savedAdmin.role
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during admin registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Controller to get all admins (accessible only by super admin)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with admins list or error
 */
export const getAllAdmins = async (req, res) => {
  try {
    // Only allow users with 'all' permission to access this endpoint
    if (!req.user.permissions.includes('all')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Insufficient permissions'
      });
    }
    
    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 });
      
    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching admins',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Controller to get a single admin by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with admin data or error
 */
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching admin',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Controller to update admin details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated admin data or error
 */
export const updateAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      designation,
      permissions,
      address
    } = req.body;

    // Find admin by ID
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Update fields
    if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;
    if (contactNumber) admin.contactNumber = contactNumber;
    if (designation) admin.designation = designation;
    if (permissions) admin.permissions = permissions;
    if (address) admin.address = { ...admin.address, ...address };

    // Save updated admin
    const updatedAdmin = await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: {
        id: updatedAdmin._id,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        firstName: updatedAdmin.firstName,
        lastName: updatedAdmin.lastName,
        adminId: updatedAdmin.adminId,
        designation: updatedAdmin.designation,
        role: updatedAdmin.role
      }
    });
  } catch (error) {
    console.error('Error updating admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating admin',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Controller to delete an admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with deletion status
 */
export const deleteAdmin = async (req, res) => {
  try {
    // Only allow users with 'all' permission to delete admins
    if (!req.user.permissions.includes('all')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Insufficient permissions'
      });
    }
    
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    await admin.remove();

    return res.status(200).json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting admin',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  registerAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
};