const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  yearsExperience: { type: Number, required: true },
  age: { type: Number, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String, required: true },
  residence: { type: String, required: true },
  availability: { type: String, enum: ['full', 'part'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', StaffSchema);
