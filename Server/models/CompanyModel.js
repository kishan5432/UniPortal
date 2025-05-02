const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: String,
    description: String,
    location: String,
    website: String,
    contactPerson: {
      name: String,
      designation: String,
      email: String,
      phone: String
    },
    visitHistory: [{
      date: Date,
      purpose: String,
      outcome: String,
      attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }]
  });