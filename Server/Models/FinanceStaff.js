import mongoose from 'mongoose';
import User from './User.js';

const FinanceStaff = User.discriminator('finance', new mongoose.Schema({
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
    default: ['view', 'create', 'update']
  },
  joiningDate: Date
}));

export default FinanceStaff;