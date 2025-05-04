import mongoose from 'mongoose';
import User from '../Models/User.js'; // Import the base User model

const Faculty = User.discriminator('faculty', new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'visiting'],
    default: 'full-time'
  },
  specialization: {
    type: [String],
    default: []
  },
  qualification: {
    type: [String],
    default: []
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
}));

export default Faculty;