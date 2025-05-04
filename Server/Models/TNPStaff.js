import mongoose from 'mongoose';
import User from './User.js';

const TNPStaff = User.discriminator('tnp', new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  responsibilities: {
    type: [String],
    default: []
  }
}));

export default TNPStaff;