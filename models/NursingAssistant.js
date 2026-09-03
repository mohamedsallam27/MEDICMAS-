const mongoose = require('mongoose');

const nursingAssistantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  residence: { type: String, required: true },
  qualificationText: { type: String, required: true },
  departments: {
    type: [String],
    enum: ['عناية مركزة', 'أدوار', 'عمليات', 'طوارئ', 'عيادات', 'حضانات'],
    default: []
  },
  documents: {
    idCardFront: { type: String },
    idCardBack: { type: String },
    qualificationCertificate: { type: String }
  },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NursingAssistant', nursingAssistantSchema);
