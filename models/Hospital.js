const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  specialtyNeeded: { type: String, required: true },
  financialOffer: { type: String, required: true },
  benefits: { type: String, default: '' },
  qualification: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', HospitalSchema);
