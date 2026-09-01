const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const adminAuth = require('../middleware/adminAuth');

router.post('/', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json({ message: 'التسجيل بنجاح' });
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
