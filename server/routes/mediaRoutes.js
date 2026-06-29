const express = require('express');
const { getMedia, deleteMedia } = require('../controllers/mediaController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/media', verifyToken, getMedia);
router.delete('/media/:id', verifyToken, deleteMedia);

module.exports = router;
