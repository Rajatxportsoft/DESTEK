const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  referralCode: { type: String },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  technologies: [{ type: String }],
  profilePic: [{ type: String }],
  dob: { type: Date, required: true },
  points: { type: Number, default: 0 },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
