const LibraryStaffSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    designation: String,
    joinDate: Date,
    responsibilities: [String]
  });