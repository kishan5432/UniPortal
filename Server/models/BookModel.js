const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: String,
    isbn: { type: String, unique: true },
    edition: String,
    category: String,
    subject: String,
    description: String,
    quantity: { type: Number, default: 1 },
    availableQuantity: { type: Number, default: 1 },
    location: { rack: String, shelf: String },
    addedDate: { type: Date, default: Date.now },
    price: Number,
    coverImage: String
  });