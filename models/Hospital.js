const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  specialtyNeeded: { type: String, required: true },
  qualification: { type: String, required: true },
  benefits: { type: String, default: '' },
  financialOffer: { type: String, required: true },
  salaryByQualification: {
    collegeGrad: { type: String, default: '' },
    instituteGrad: { type: String, default: '' },
    collegeIntern: { type: String, default: '' },
    instituteIntern: { type: String, default: '' },
    collegeStudent: { type: String, default: '' },
    instituteStudent: { type: String, default: '' }
  },
  contactName: { type: String, required: true },
  contactJobTitle: { type: String, required: true },
  contactPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', HospitalSchema);
