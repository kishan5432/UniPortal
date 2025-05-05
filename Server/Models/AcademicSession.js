import mongoose from "mongoose";

const AcademicSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['semester', 'trimester', 'annual'],
    default: 'semester'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const AcademicSession = mongoose.model('AcademicSession', AcademicSessionSchema);

export default AcademicSession;