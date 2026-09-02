const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const Staff = require('../models/Staff');
const adminAuth = require('../middleware/adminAuth');
const cloudinary = require('../models/config/cloudinary');

// تخزين الملفات مؤقتًا في الذاكرة قبل رفعها على Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } }); // 8MB حد أقصى لكل ملف

// حقول الملفات المتوقعة من فورم التسجيل
const uploadFields = upload.fields([
  { name: 'idCardFront', maxCount: 1 },
  { name: 'idCardBack', maxCount: 1 },
  { name: 'internshipCertificate', maxCount: 1 },
  { name: 'licenseCard', maxCount: 1 },
  { name: 'experienceCertificate', maxCount: 1 },
  { name: 'personalPhoto', maxCount: 1 }
]);

// دالة لرفع ملف واحد على Cloudinary من الذاكرة
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

    // رفع كل صورة موجودة على Cloudinary وحفظ رابطها
    for (const field of ['idCardFront', 'idCardBack', 'internshipCertificate', 'licenseCard', 'experienceCertificate', 'personalPhoto']) {
      if (files[field] && files[field][0]) {
        documents[field] = await uploadToCloudinary(files[field][0].buffer, field);
      }
    }

    const staff = new Staff({
      ...req.body,
      documents,
      status: 'pending'
    });

    await staff.save();
    res.status(201).json({ message: 'تم التسجيل بنجاح، طلبك الآن في انتظار مراجعة المسؤولين عن التطبيق على الأوراق المقدمة' });
  } catch (err) {
    console.error('STAFF SAVE ERROR:', err);
    res.status(400).json({ error: 'خطأ في التسجيل', message: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  const all = await Staff.find().sort({ createdAt: -1 });
  res.json(all);
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
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
