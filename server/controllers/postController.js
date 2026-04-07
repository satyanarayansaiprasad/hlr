const db = require('../config/firebase');
const slugify = require('../utils/slugify');

const postsRef = db.collection('posts');

const getPosts = async (req, res) => {
  try {
    const snapshot = await postsRef.orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts.', error: error.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const snapshot = await postsRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const postDoc = snapshot.docs[0];
    return res.status(200).json({ id: postDoc.id, ...postDoc.data() });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch post.', error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      featuredImage,
      productIds = [],
      tags = [],
      category,
      seoTitle,
      metaDescription,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (!(await postsRef.where('slug', '==', slug).limit(1).get()).empty) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const payload = {
      title,
      slug,
      content,
      author: author || null,
      featuredImage: featuredImage || '',
      productIds,
      tags,
      category: category || '',
      seoTitle: seoTitle || '',
      metaDescription: metaDescription || '',
      createdAt: new Date().toISOString(),
    };

    const created = await postsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post.', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = postsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const updates = { ...req.body };

    if (updates.title) {
      updates.slug = slugify(updates.title);
    }

    await docRef.update(updates);
    const updated = await docRef.get();
    return res.status(200).json({ id: updated.id, ...updated.data() });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update post.', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = postsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post.', error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
