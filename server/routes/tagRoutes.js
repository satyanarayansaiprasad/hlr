const express = require('express');
const { getTags, mergeTags } = require('../controllers/tagController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/tags', getTags);
router.post('/tags/merge', verifyToken, mergeTags);

module.exports = router;
