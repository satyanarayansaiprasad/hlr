const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authorRoutes = require('./routes/authorRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const upload = require('./middleware/upload');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve local upload folder statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image upload failed.' });
  }

  const { isCloudinaryConfigured } = require('./config/cloudinary');
  let imageUrl = req.file.path;
  
  if (!isCloudinaryConfigured) {
    // Return relative URL for statically served local file
    imageUrl = `/uploads/${req.file.filename}`;
  }

  return res.status(200).json({
    message: 'Upload successful.',
    imageUrl: imageUrl,
  });
});

app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);
app.use('/api', authorRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', mediaRoutes);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: 'Server error.', error: error.message });
});

module.exports = app;
