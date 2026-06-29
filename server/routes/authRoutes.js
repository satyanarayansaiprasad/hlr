const express = require('express');
const { login, verify } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/auth/login', login);
router.get('/auth/verify', verifyToken, verify);

module.exports = router;
