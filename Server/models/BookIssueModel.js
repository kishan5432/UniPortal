const BookIssueSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: Date,
    status: { type: String, enum: ['issued', 'returned', 'overdue', 'lost'], default: 'issued' },
    fine: { type: Number, default: 0 },
    finePaid: { type: Boolean, default: false },
    remarks: String,
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    returnedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });