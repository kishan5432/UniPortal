import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Base User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    default: ''
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'student', 'library', 'tnp', 'finance'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  discriminatorKey: 'role',
  collection: 'users'
});

// Password validation
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create the base User model
const User = mongoose.model.User || mongoose.model('User', userSchema);

export default User;