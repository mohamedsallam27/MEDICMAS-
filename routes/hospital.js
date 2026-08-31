const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const adminAuth = require('../middleware/adminAuth');

router.post('/', async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ message: 'تم إرسال الطلب بنجاح' });
  } catch (err) {
    res.status(400).json({ error: 'حدث خطأ في الإرسال', details: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  const all = await Hospital.find().sort({ createdAt: -1 });
  res.json(all);
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Hospital.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'حدث خطأ في التعديل', details: err.message });
  }
});

module.exports = router;
