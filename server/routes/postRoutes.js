const express = require('express');
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  restorePost,
  duplicatePost,
  bulkAction
} = require('../controllers/postController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);

// Protected Admin Routes
router.post('/posts', verifyToken, createPost);
router.put('/posts/:id', verifyToken, updatePost);
router.delete('/posts/:id', verifyToken, deletePost);
router.post('/posts/bulk', verifyToken, bulkAction);
router.post('/posts/:id/restore', verifyToken, restorePost);
router.post('/posts/:id/duplicate', verifyToken, duplicatePost);

// Manual Seeding Trigger Route
const seedDatabase = require('../utils/seed');
router.post('/posts/seed', verifyToken, async (req, res) => {
  try {
    const force = req.query.force === 'true';
    await seedDatabase(force);
    res.status(200).json({ message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Seeding database failed.', error: err.message });
  }
});

module.exports = router;
