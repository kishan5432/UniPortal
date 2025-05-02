import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      enum: ['student', 'faculty', 'finance', 'tnp', 'admin', 'library'],
      required: true 
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    profilePicture: String,
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });