const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const NursingAssistant = require('../models/NursingAssistant');
const adminAuth = require('../middleware/adminAuth');
const cloudinary = require('../models/config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

const uploadFields = upload.fields([
  { name: 'idCardFront', maxCount: 1 },
  { name: 'idCardBack', maxCount: 1 },
  { name: 'qualificationCertificate', maxCount: 1 }
]);

function uploadToCloudinary(fileBuffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `medicmas/${folder}` },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

router.post('/', uploadFields, async (req, res) => {
  try {
    const documents = {};
    const files = req.files || {};

    for (const field of ['idCardFront', 'idCardBack', 'qualificationCertificate']) {
      if (files[field] && files[field][0]) {
        documents[field] = await uploadToCloudinary(files[field][0].buffer, field);
      }
    }

    let departments = req.body.departments;
    if (typeof departments === 'string') departments = [departments];

    const nursingAssistant = new NursingAssistant({
      fullName: req.body.fullName,
      age: req.body.age,
      residence: req.body.residence,
      qualificationText: req.body.qualificationText,
      departments: departments || [],
      documents,
      status: 'pending'
    });

    await nursingAssistant.save();
    res.status(201).json({ message: 'تم التسجيل بنجاح، طلبك الآن في انتظار مراجعة المسؤولين عن التطبيق على الأوراق المقدمة' });
  } catch (err) {
    console.error('NURSING ASSISTANT SAVE ERROR:', err);
    res.status(400).json({ error: 'خطأ في التسجيل', message: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  const all = await NursingAssistant.find().sort({ createdAt: -1 });
  res.json(all);
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await NursingAssistant.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'خطأ في التعديل' });
  }
});

module.exports = router;
