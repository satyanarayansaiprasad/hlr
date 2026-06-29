const db = require('../config/firebase');

const postsRef = db.collection('posts');
const categoriesRef = db.collection('categories');
const authorsRef = db.collection('authors');

const getStats = async (req, res) => {
  try {
    // Fetch all posts to perform aggregation
    const postsSnapshot = await postsRef.get();
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const nonDeletedPosts = posts.filter(p => !p.deletedAt);

    const totalBlogs = nonDeletedPosts.length;
    const publishedBlogs = nonDeletedPosts.filter(p => p.status === 'published').length;
    const draftBlogs = nonDeletedPosts.filter(p => p.status === 'draft' || p.status === 'unsaved').length;
    const scheduledBlogs = nonDeletedPosts.filter(p => p.status === 'scheduled').length;

    // Fetch categories
    const categoriesSnapshot = await categoriesRef.get();
    const totalCategories = categoriesSnapshot.size;

    // Fetch unique tags from posts
    const tagSet = new Set();
    nonDeletedPosts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach(t => tagSet.add(t));
      }
      if (Array.isArray(post.keywords)) {
        post.keywords.forEach(k => tagSet.add(k));
      }
    });
    const totalTags = tagSet.size;

    // Recent Blogs (Sort non-deleted posts by createdAt desc and slice 5)
    const recentBlogs = [...nonDeletedPosts]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        slug: p.slug,
        categorySlug: p.categorySlug,
        status: p.status,
        createdAt: p.createdAt
      }));

    // Mock Recent Activities for the dashboard feed
    const recentActivity = [
      { id: 1, type: 'info', text: 'CMS initialized and database loaded.', time: 'Just now' },
    ];

    if (recentBlogs.length > 0) {
      recentActivity.unshift({
        id: 2,
        type: 'post',
        text: `Latest blog "${recentBlogs[0].title}" is live.`,
        time: 'Recently'
      });
    }

    return res.status(200).json({
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        scheduledBlogs,
        totalCategories,
        totalTags
      },
      recentBlogs,
      recentActivity
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve dashboard stats.', error: error.message });
  }
};

module.exports = { getStats };
