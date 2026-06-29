const express = require('express');
const {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/authors', getAuthors);
router.post('/authors', verifyToken, createAuthor);
router.put('/authors/:id', verifyToken, updateAuthor);
router.delete('/authors/:id', verifyToken, deleteAuthor);

module.exports = router;
