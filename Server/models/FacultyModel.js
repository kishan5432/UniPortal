const FacultySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    designation: String,
    joinDate: Date,
    qualifications: [{
      degree: String,
      institution: String,
      year: Number,
      specialization: String
    }],
    assignedCourses: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      semester: Number,
      academicYear: String,
      section: String
    }],
    timetable: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      startTime: String,
      endTime: String,
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      room: String,
      section: String
    }],
    leaveBalance: {
      casual: Number,
      medical: Number,
      earned: Number
    },
    leaveApplications: [{
      startDate: Date,
      endDate: Date,
      type: { type: String, enum: ['casual', 'medical', 'earned', 'other'] },
      reason: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected'] },
      appliedOn: Date,
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reviewedOn: Date,
      comments: String
    }]
  });