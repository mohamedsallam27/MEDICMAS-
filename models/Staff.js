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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Staff', staffSchema);
