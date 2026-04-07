const express = require('express');
const {
  getCommentsByPostId,
  createComment,
} = require('../controllers/commentController');

const router = express.Router();

router.get('/comments/:postId', getCommentsByPostId);
router.post('/comments', createComment);

module.exports = router;
