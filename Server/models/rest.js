const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'success', 'error'] },
    relatedTo: {
      model: { type: String, enum: ['Course', 'Assignment', 'Exam', 'Fee', 'Event', 'Announcement', 'Job', 'Book'] },
      id: mongoose.Schema.Types.ObjectId
    },
    isRead: { type: Boolean, default: false },
    readAt: Date,
    createdAt: { type: Date, default: Date.now }
  });
  
  // 18. Fee Structure Schema
  const FeeStructureSchema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    semester: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    batch: { type: String, required: true },
    tuitionFee: { type: Number, required: true },
    developmentFee: Number,
    libraryFee: Number,
    examinationFee: Number,
    laboratoryFee: Number,
    hosteFee: Number,
    transportFee: Number,
    otherFees: [{
      name: String,
      amount: Number
    }],
    totalFee: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    lateFineFee: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // 19. Payment Schema
  const PaymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    academicYear: { type: String, required: true },
    semester: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['online', 'cash', 'cheque', 'bank transfer', 'scholarship'] },
    transactionId: String,
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['successful', 'pending', 'failed', 'refunded'] },
    receiptNumber: String,
    remarks: String,
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  // 20. Attendance Schema
  const AttendanceSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    date: { type: Date, required: true },
    timeSlot: {
      startTime: String,
      endTime: String
    },
    students: [{
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      status: { type: String, enum: ['present', 'absent', 'late'], default: 'absent' }
    }],
    section: String,
    topic: String,
    remarks: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // 21. Examination Schema
  const ExaminationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['internal', 'external', 'quiz', 'practical', 'project'] },
    academicYear: { type: String, required: true },
    semester: { type: Number, required: true },
    courses: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      examDate: Date,
      startTime: String,
      endTime: String,
      venue: String,
      maxMarks: Number
    }],
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    batches: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // 22. Result Schema
  const ResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    examination: { type: mongoose.Schema.Types.ObjectId, ref: 'Examination', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    marks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    grade: String,
    gradePoints: Number,
    remarks: String,
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    enteredAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    updatedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false }
  });
  
  // 23. Semester Result Schema
  const SemesterResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    semester: { type: Number, required: true },
    academicYear: { type: String, required: true },
    results: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      internalMarks: Number,
      externalMarks: Number,
      totalMarks: Number,
      grade: String,
      creditPoints: Number,
      gradePoints: Number
    }],
    totalMarks: Number,
    percentage: Number,
    sgpa: Number,
    cgpa: Number,
    status: { type: String, enum: ['pass', 'fail', 'backlog', 'awaiting'] },
    publishedOn: Date,
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  // 24. Document Schema
  const DocumentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    mimeType: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedDate: Date,
    remarks: String,
    isPublic: { type: Boolean, default: false },
    accessibleTo: [{
      role: { 
        type: String, 
        enum: ['student', 'faculty', 'finance', 'tnp', 'admin', 'library'] 
      },
      department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
    }]
  });
  
  // 25. Timetable Schema
  const TimetableSchema = new mongoose.Schema({
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semester: { type: Number, required: true },
    section: { type: String, required: true },
    academicYear: { type: String, required: true },
    schedule: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      periods: [{
        periodNumber: Number,
        startTime: String,
        endTime: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
        room: String,
        type: { type: String, enum: ['theory', 'practical', 'tutorial', 'other'] }
      }]
    }],
    effectiveFrom: Date,
    effectiveTill: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });