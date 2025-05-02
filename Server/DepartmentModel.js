const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    facultyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });