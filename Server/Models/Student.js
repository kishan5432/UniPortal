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
  },
  enrolledCourses: [{
    courseOffering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseOffering'
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'dropped', 'failed'],
      default: 'active'
    }
  }],
  academicRecord: [{
    semester: Number,
    gpa: Number,
    totalCredits: Number,
    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSession'
    }
  }],
  attendance: [{
    courseOffering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseOffering'
    },
    present: Number,
    absent: Number,
    percentage: Number
  }]
}));

export default Student;