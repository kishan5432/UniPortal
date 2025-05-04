import mongoose from 'mongoose';
import User from './User.js';

const Student = User.discriminator('student', new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  program: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  enrollmentYear: {
    type: Number,
    required: true
  },
  currentSemester: {
    type: Number,
    required: true
  }
}));

export default Student;