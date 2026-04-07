const express = require('express');
const { getAuthors, createAuthor } = require('../controllers/authorController');

const router = express.Router();

router.get('/authors', getAuthors);
router.post('/authors', createAuthor);

module.exports = router;
