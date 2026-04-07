const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authorRoutes = require('./routes/authorRoutes');
const upload = require('./middleware/upload');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Image upload failed.' });
  }

  return res.status(200).json({
    message: 'Upload successful.',
    imageUrl: req.file.path,
  });
});

app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);
app.use('/api', authorRoutes);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: 'Server error.', error: error.message });
});

module.exports = app;
