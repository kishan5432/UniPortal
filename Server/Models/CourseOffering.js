import mongoose from "mongoose";

const CourseOfferingSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  academicSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicSession',
    required: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: String,
    endTime: String,
    room: String
  }],
  maxStudents: {
    type: Number,
    default: 60
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  waitlistedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const CourseOffering = mongoose.model('CourseOffering', CourseOfferingSchema);

export default CourseOffering;