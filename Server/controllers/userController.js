import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import Faculty from '../Models/Faculty.js';
import Student from '../Models/Student.js';
import LibraryStaff from '../Models/LibraryStaff.js';
import TNPStaff from '../Models/TNPStaff.js';
import FinanceStaff from '../Models/FinanceStaff.js';
import Department from '../Models/Department.js';
import mongoose from 'mongoose';

// Helper function to create role-specific user
const createRoleSpecificUser = async (userData, role) => {
  let user;
  
  switch (role) {
    case 'admin':
      user = new Admin({
        ...userData,
        role: 'admin'
      });
      break;
    case 'faculty':
      user = new Faculty({
        ...userData,
        role: 'faculty'
      });
      break;
    case 'student':
      user = new Student({
        ...userData,
        role: 'student'
      });
      break;
    case 'library':
      user = new LibraryStaff({
        ...userData,
        role: 'library'
      });
      break;
    case 'tnp':
      user = new TNPStaff({
        ...userData,
        role: 'tnp'
      });
      break;
    case 'finance':
      user = new FinanceStaff({
        ...userData,
        role: 'finance'
      });
      break;
    default:
      user = new User({
        ...userData
      });
  }
  
  return await user.save();
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('department', 'name code');
    
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('department', 'name code');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if requesting user is admin or the user themselves
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    contactNumber,
    address,
    ...roleSpecificData
  } = req.body;
  
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user data object
    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      contactNumber: contactNumber || '',
      address: address || {},
      ...roleSpecificData
    };
    
    // Create and save the user based on role
    const user = await createRoleSpecificUser(userData, role);
    
    // Remove password from response
    const responseUser = user.toObject();
    delete responseUser.password;
    
    res.status(201).json(responseUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    contactNumber,
    address,
    isActive,
    ...roleSpecificData
  } = req.body;
  
  // Build user object
  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (contactNumber) userFields.contactNumber = contactNumber;
  if (address) userFields.address = address;
  if (isActive !== undefined) userFields.isActive = isActive;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, 10);
  }
  
  // Add role-specific fields
  if (role === 'faculty') {
    if (roleSpecificData.department) userFields.department = roleSpecificData.department;
    if (roleSpecificData.designation) userFields.designation = roleSpecificData.designation;
    if (roleSpecificData.employmentType) userFields.employmentType = roleSpecificData.employmentType;
    if (roleSpecificData.specialization) userFields.specialization = roleSpecificData.specialization;
    if (roleSpecificData.qualification) userFields.qualification = roleSpecificData.qualification;
    if (roleSpecificData.joiningDate) userFields.joiningDate = roleSpecificData.joiningDate;
    if (roleSpecificData.facultyId) userFields.facultyId = roleSpecificData.facultyId;
  } else if (role === 'student') {
    if (roleSpecificData.department) userFields.department = roleSpecificData.department;
    if (roleSpecificData.program) userFields.program = roleSpecificData.program;
    if (roleSpecificData.batch) userFields.batch = roleSpecificData.batch;
    if (roleSpecificData.enrollmentYear) userFields.enrollmentYear = roleSpecificData.enrollmentYear;
    if (roleSpecificData.currentSemester) userFields.currentSemester = roleSpecificData.currentSemester;
    if (roleSpecificData.studentId) userFields.studentId = roleSpecificData.studentId;
  } else if (role === 'admin') {
    if (roleSpecificData.adminId) userFields.adminId = roleSpecificData.adminId;
    if (roleSpecificData.designation) userFields.designation = roleSpecificData.designation;
    if (roleSpecificData.permissions) userFields.permissions = roleSpecificData.permissions;
  } else if (role === 'library') {
    if (roleSpecificData.staffId) userFields.staffId = roleSpecificData.staffId;
    if (roleSpecificData.designation) userFields.designation = roleSpecificData.designation;
    if (roleSpecificData.permissions) userFields.permissions = roleSpecificData.permissions;
  } else if (role === 'tnp') {
    if (roleSpecificData.staffId) userFields.staffId = roleSpecificData.staffId;
    if (roleSpecificData.designation) userFields.designation = roleSpecificData.designation;
    if (roleSpecificData.responsibilities) userFields.responsibilities = roleSpecificData.responsibilities;
  } else if (role === 'finance') {
    if (roleSpecificData.staffId) userFields.staffId = roleSpecificData.staffId;
    if (roleSpecificData.designation) userFields.designation = roleSpecificData.designation;
    if (roleSpecificData.permissions) userFields.permissions = roleSpecificData.permissions;
  }
  
  try {
    // Check if user exists
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }
    
    // Update user fields
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  const { role, ...roleSpecificData } = req.body;
  
  try {
    // Check if user exists
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user data without password
    const userData = user.toObject();
    delete userData.password;
    delete userData._id;
    delete userData.__v;
    
    // Delete the old user
    await User.findByIdAndDelete(req.params.id);
    
    // Create a new user with the updated role and data
    const updatedUserData = {
      ...userData,
      role,
      ...roleSpecificData
    };
    
    // Create and save the user with new role
    const newUser = await createRoleSpecificUser(updatedUserData, role);
    
    // Remove password from response
    const responseUser = newUser.toObject();
    delete responseUser.password;
    
    res.json(responseUser);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Toggle user status (activate/deactivate)
export const toggleUserStatus = async (req, res) => {
  const { isActive } = req.body;
  
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { isActive } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Reset user password
export const resetUserPassword = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate a random password
    const tempPassword = Math.random().toString(36).slice(-8);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    // Update user with new password
    await User.findByIdAndUpdate(req.params.id, {
      $set: { 
        password: hashedPassword,
        resetPasswordToken: jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET || 'mysecrettoken',
          { expiresIn: '24h' }
        ),
        resetPasswordExpires: Date.now() + 86400000 // 24 hours
      }
    });
    
    // In a real application, send email with temp password
    // For now, just return success message
    res.json({ 
      message: 'Password reset successful',
      tempPassword // In production, don't return this!
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get departments (for user creation/editing)
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().select('name code');
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getFacultyUsers = async (req, res) => {
  try {
    // Access the User model directly
    const User = mongoose.model('User');
    
    // Find all users with role = faculty
    const facultyUsers = await User.find({ 
      role: 'faculty' 
    }).populate('department', 'name code');

    
    
    // Return success response with faculty data
    return res.status(200).json({
      success: true,
      count: facultyUsers.length,
      data: facultyUsers
    });
    
  } catch (error) {
    console.error('Error fetching faculty users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve faculty users',
      error: error.message
    });
  }
};