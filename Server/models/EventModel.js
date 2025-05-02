const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['academic', 'cultural', 'sports', 'workshop', 'seminar', 'other'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    venue: String,
    organizer: {
      department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
      committee: String,
      contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    targetAudience: {
      roles: [{ 
        type: String, 
        enum: ['student', 'faculty', 'finance', 'tnp', 'admin', 'library', 'all'] 
      }],
      departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
      batches: [String]
    },
    registrations: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      registeredAt: { type: Date, default: Date.now },
      attendance: { type: Boolean, default: false }
    }],
    attachments: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });