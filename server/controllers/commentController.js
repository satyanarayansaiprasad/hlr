const db = require('../config/firebase');

const commentsRef = db.collection('comments');

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const snapshot = await commentsRef.where('postId', '==', postId).get();

    const comments = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const ta = new Date(a.createdAt || 0).getTime();
        const tb = new Date(b.createdAt || 0).getTime();
        return tb - ta;
      });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch comments.', error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { postId, name, message } = req.body;

    if (!postId || !name || !message) {
      return res.status(400).json({ message: 'postId, name and message are required.' });
    }

    const payload = {
      postId,
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    const created = await commentsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create comment.', error: error.message });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
};
