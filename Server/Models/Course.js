import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  description: String,
  credits: {
    type: Number,
    required: true
  },
  syllabus: String,
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  isElective: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;