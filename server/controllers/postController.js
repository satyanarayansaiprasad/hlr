const db = require('../config/firebase');
const slugify = require('../utils/slugify');

const postsRef = db.collection('posts');
const authorsRef = db.collection('authors');
const productsRef = db.collection('products');

// Get all posts (with filtering, search, sorting, and pagination)
const getPosts = async (req, res) => {
  try {
    const {
      category,
      status,
      q,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      admin = 'false',
      page,
      limit,
    } = req.query;

    const snapshot = await postsRef.get();
    let posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const isAdmin = admin === 'true';

    // 1. Soft Delete Filtering
    if (!isAdmin) {
      // Public users only see published and non-deleted posts
      posts = posts.filter(
        (p) => !p.deletedAt && p.status === 'published' && (!p.publishDate || new Date(p.publishDate) <= new Date())
      );
    } else {
      // Admin users see based on status query
      if (status === 'deleted') {
        posts = posts.filter((p) => !!p.deletedAt);
      } else {
        posts = posts.filter((p) => !p.deletedAt);
      }
    }

    // 2. Category Filtering
    if (category && category !== 'All' && category !== 'all') {
      posts = posts.filter(
        (p) =>
          (p.categorySlug && p.categorySlug.toLowerCase() === category.toLowerCase()) ||
          (p.category && p.category.toLowerCase() === category.toLowerCase())
      );
    }

    // 3. Status Filtering (except for deleted, which is handled above)
    if (status && status !== 'All' && status !== 'all' && status !== 'deleted') {
      posts = posts.filter((p) => p.status === status);
    }

    // 4. Text Search
    if (q) {
      const searchLower = q.toLowerCase();
      posts = posts.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(searchLower)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(searchLower)) ||
          (p.name && p.name.toLowerCase().includes(searchLower)) ||
          (p.content && p.content.toLowerCase().includes(searchLower))
      );
    }

    // 5. Sorting
    posts.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'string') {
        return sortOrder === 'desc'
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

    // 6. Pagination
    if (page && limit) {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const total = posts.length;
      const start = (pageNum - 1) * limitNum;
      const paginated = posts.slice(start, start + limitNum);

      return res.status(200).json({
        posts: paginated,
        total,
        page: pageNum,
        limit: limitNum,
      });
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts.', error: error.message });
  }
};

// Get single post by slug
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const snapshot = await postsRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const postDoc = snapshot.docs[0];
    const postData = postDoc.data();

    // Fetch associated Author and Product if IDs are present but embedded data isn't complete
    let author = postData.author;
    if (postData.authorId && (!author || !author.name)) {
      const authorDoc = await authorsRef.doc(postData.authorId).get();
      if (authorDoc.exists) {
        author = authorDoc.data();
      }
    }

    let product = postData.product;
    if (postData.productId && (!product || !product.name)) {
      const productDoc = await productsRef.doc(postData.productId).get();
      if (productDoc.exists) {
        product = productDoc.data();
      }
    }

    return res.status(200).json({
      id: postDoc.id,
      ...postData,
      author,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch post.', error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const {
      title,
      name,
      content,
      category,
      categorySlug,
      image,
      rating,
      metaTitle,
      metaDescription,
      excerpt,
      pros,
      cons,
      buyUrl,
      readTime,
      status = 'draft',
      publishDate,
      authorId,
      productId,
      faqs = [],
      keywords = [],
      isFeatured = false,
      isTrending = false,
      isPopular = false,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Auto-generate Slug
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (!(await postsRef.where('slug', '==', slug).limit(1).get()).empty) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    // Fetch author details for embedding
    let authorDetails = null;
    if (authorId) {
      const authorDoc = await authorsRef.doc(authorId).get();
      if (authorDoc.exists) {
        authorDetails = { id: authorDoc.id, ...authorDoc.data() };
      }
    }

    // Fetch product details for embedding
    let productDetails = null;
    if (productId) {
      const productDoc = await productsRef.doc(productId).get();
      if (productDoc.exists) {
        productDetails = { id: productDoc.id, ...productDoc.data() };
      }
    }

    const payload = {
      name: name || title,
      title,
      slug,
      content,
      category: category || 'General',
      categorySlug: categorySlug || 'general',
      image: image || '',
      rating: parseFloat(rating) || 4.5,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || '',
      excerpt: excerpt || '',
      pros: pros || [],
      cons: cons || [],
      buyUrl: buyUrl || '',
      readTime: readTime || '5 min read',
      status,
      publishDate: publishDate || new Date().toISOString(),
      date: `updated ${new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}`,
      authorId: authorId || null,
      productId: productId || null,
      author: authorDetails,
      product: productDetails,
      faqs,
      comments: [],
      keywords,
      isFeatured,
      isTrending,
      isPopular,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };

    const created = await postsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post.', error: error.message });
  }
};

// Update an existing post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = postsRef.doc(id);
    const existingDoc = await docRef.get();

    if (!existingDoc.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const updates = { ...req.body };
    updates.updatedAt = new Date().toISOString();

    // Re-generate slug if title changed
    if (updates.title && updates.title !== existingDoc.data().title) {
      const baseSlug = slugify(updates.title);
      let slug = baseSlug;
      let counter = 1;

      while (true) {
        const dupSnapshot = await postsRef.where('slug', '==', slug).limit(1).get();
        if (dupSnapshot.empty || dupSnapshot.docs[0].id === id) {
          break;
        }
        slug = `${baseSlug}-${counter}`;
        counter += 1;
      }
      updates.slug = slug;
    }

    // Embed updated author if authorId changed
    if (updates.authorId) {
      const authorDoc = await authorsRef.doc(updates.authorId).get();
      if (authorDoc.exists) {
        updates.author = { id: authorDoc.id, ...authorDoc.data() };
      }
    }

    // Embed updated product if productId changed
    if (updates.productId) {
      const productDoc = await productsRef.doc(updates.productId).get();
      if (productDoc.exists) {
        updates.product = { id: productDoc.id, ...productDoc.data() };
      }
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update post.', error: error.message });
  }
};

// Soft Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = postsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Soft Delete
    await docRef.update({ deletedAt: new Date().toISOString() });
    return res.status(200).json({ message: 'Post soft deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post.', error: error.message });
  }
};

// Restore a soft-deleted post
const restorePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = postsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    await docRef.update({ deletedAt: null });
    return res.status(200).json({ message: 'Post restored successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to restore post.', error: error.message });
  }
};

// Duplicate a post
const duplicatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await postsRef.doc(id).get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const data = existing.data();
    const newTitle = `${data.title} (Copy)`;
    
    // Auto generate unique slug
    const baseSlug = slugify(newTitle);
    let slug = baseSlug;
    let counter = 1;
    while (!(await postsRef.where('slug', '==', slug).limit(1).get()).empty) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const payload = {
      ...data,
      title: newTitle,
      slug,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    };

    const created = await postsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to duplicate post.', error: error.message });
  }
};

// Bulk operations (delete, publish, draft, category update)
const bulkAction = async (req, res) => {
  try {
    const { ids, action, category, categorySlug } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'List of post IDs is required.' });
    }

    for (const id of ids) {
      const docRef = postsRef.doc(id);
      const doc = await docRef.get();
      if (!doc.exists) continue;

      if (action === 'delete') {
        await docRef.update({ deletedAt: new Date().toISOString() });
      } else if (action === 'publish') {
        await docRef.update({ status: 'published', deletedAt: null });
      } else if (action === 'draft') {
        await docRef.update({ status: 'draft' });
      } else if (action === 'category') {
        await docRef.update({ category, categorySlug });
      }
    }

    return res.status(200).json({ message: `Bulk action "${action}" completed successfully.` });
  } catch (error) {
    return res.status(500).json({ message: 'Bulk action failed.', error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  restorePost,
  duplicatePost,
  bulkAction
};
