const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    description: String,
    jobType: { type: String, enum: ['full-time', 'internship', 'part-time', 'contract'] },
    eligibilityCriteria: {
      departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
      minCGPA: Number,
      backlogs: { type: Boolean, default: false },
      skills: [String],
      graduationYear: Number,
      other: String
    },
    salary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    location: String,
    applicationDeadline: Date,
    driveDate: Date,
    selectionProcess: [String],
    status: { type: String, enum: ['open', 'closed', 'draft'], default: 'draft' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedDate: { type: Date, default: Date.now },
    attachments: [String]
  });
  