const db = require('../config/firebase');

const categoriesRef = db.collection('categories');

const getCategories = async (req, res) => {
  try {
    const snapshot = await categoriesRef.get();
    const categories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Sort by order or name
    categories.sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 999;
      const orderB = b.order !== undefined ? b.order : 999;
      return orderA - orderB;
    });

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch categories.', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, icon, order } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload = {
      id,
      name,
      icon: icon || 'ri-health-book-line',
      order: order !== undefined ? parseInt(order, 10) : 10,
      count: 0,
    };

    await categoriesRef.doc(id).set(payload);
    return res.status(201).json(payload);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create category.', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, order } = req.body;

    const docRef = categoriesRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (icon) updates.icon = icon;
    if (order !== undefined) updates.order = parseInt(order, 10);

    await docRef.update(updates);
    const updated = await docRef.get();
    return res.status(200).json(updated.data());
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update category.', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = categoriesRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete category.', error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
