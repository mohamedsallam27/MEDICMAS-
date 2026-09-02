const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  yearsExperience: { type: Number, required: true },
  age: { type: Number, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String, required: true },
  residence: { type: String, required: true },
  availability: { type: String, enum: ['full', 'part'], required: true },

  academicStatus: {
    type: String,
    enum: [
      'grad_institute',
      'grad_college',
      'student_institute',
      'intern_institute',
      'student_college',
      'intern_college'
    ],
    required: true
  },
  graduationYear: { type: Number },

  // مكان العمل الحكومي - يظهر فقط لخريج معهد / خريج كلية
  governmentWorkplace: { type: String },

  // المستندات المرفوعة
  documents: {
    idCardFront: { type: String },
    idCardBack: { type: String },
    internshipCertificate: { type: String },
    licenseCard: { type: String },
    experienceCertificate: { type: String },
    personalPhoto: { type: String }
  },

  // حالة القبول
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
