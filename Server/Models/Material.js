import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  courseOffering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseOffering',
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;