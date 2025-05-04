import mongoose from 'mongoose';
import User from './User.js';

const LibraryStaff = User.discriminator('library', new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: ['view', 'issue', 'return']
  }
}));

export default LibraryStaff;