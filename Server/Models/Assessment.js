import mongoose from "mongoose";

// Assessment Schema
const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  courseOffering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseOffering',
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'assignment', 'project', 'mid-term', 'end-term', 'lab'],
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  weightage: {
    type: Number,
    required: true
  },
  dueDate: Date,
  instructions: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;