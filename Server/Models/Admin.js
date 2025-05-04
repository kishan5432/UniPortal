import mongoose from 'mongoose';
import User from './User.js'; // Import the base User model

const Admin = User.discriminator('admin', new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: ['all']
  }
}));

export default Admin;