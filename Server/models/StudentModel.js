const StudentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registrationNumber: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    batch: { type: String, required: true },
    semester: { type: Number, required: true },
    section: String,
    enrolledCourses: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course' 
    }],
    attendance: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      date: Date,
      status: { type: String, enum: ['present', 'absent', 'late'] }
    }],
    grades: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      examType: String,
      marks: Number,
      totalMarks: Number,
      grade: String
    }],
    fees: [{
      academicYear: String,
      semester: Number,
      amount: Number,
      status: { type: String, enum: ['paid', 'pending', 'partial'] },
      transactions: [{
        amount: Number,
        paymentDate: Date,
        paymentMethod: String,
        transactionId: String,
        receipt: String
      }]
    }],
    documents: [{
      title: String,
      type: String,
      fileUrl: String,
      uploadDate: Date,
      verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'] }
    }],
    leaveApplications: [{
      startDate: Date,
      endDate: Date,
      reason: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected'] },
      appliedOn: Date,
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reviewedOn: Date,
      comments: String
    }]
  });
  