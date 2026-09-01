const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    yearsExperience: {
      type: Number,
      required: true,
      min: 0
    },
    age: {
      type: Number,
      required: true,
      min: 18
    },
    specialty: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    gmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    residence: {
      type: String,
      required: true,
      trim: true
    },
    availability: {
      type: String,
      required: true,
      enum: ['full', 'part']
    },
    hasLicense: {
      type: Boolean,
      default: false
    },
    academicStatus: {
      type: String,
      required: true,
      enum: [
        'grad_institute',
        'grad_college',
        'student_institute',
        'intern_institute',
        'student_college',
        'intern_college'
      ]
    },
    graduationYear: {
      type: Number,
      required: false,
      min: 1970
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Staff', staffSchema);
