require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/staff', require('./routes/staff'));
app.use('/api/hospital', require('./routes/hospital'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    app.listen(PORT, () => console.log(`MEDICMAS شغال على البورت ${PORT}`));
  })
  .catch((err) => {
    console.error('فشل الاتصال بقاعدة البيانات:', err.message);
    process.exit(1);
  });
