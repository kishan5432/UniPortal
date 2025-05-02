const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    credits: { type: Number, required: true },
    semester: Number,
    syllabus: String,
    assignments: [{
      title: String,
      description: String,
      dueDate: Date,
      totalMarks: Number,
      attachments: [String]
    }],
    materials: [{
      title: String,
      type: { type: String, enum: ['pdf', 'video', 'presentation', 'link', 'other'] },
      url: String,
      uploadDate: Date
    }],
    examinations: [{
      title: String,
      date: Date,
      duration: Number, // in minutes
      totalMarks: Number,
      examType: { type: String, enum: ['quiz', 'midterm', 'final', 'assignment', 'project'] }
    }]
  });