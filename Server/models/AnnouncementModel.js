const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    targetAudience: {
      roles: [{ 
        type: String, 
        enum: ['student', 'faculty', 'finance', 'tnp', 'admin', 'library', 'all'] 
      }],
      departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
      batches: [String],
      specific: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    validTill: Date,
    attachments: [String],
    isUrgent: { type: Boolean, default: false },
    reads: [{ 
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      readAt: Date
    }]
  });