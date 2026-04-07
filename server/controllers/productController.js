const db = require('../config/firebase');

const productsRef = db.collection('products');

const getProducts = async (req, res) => {
  try {
    const snapshot = await productsRef.get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch products.', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      images = [],
      price,
      rating,
      affiliateLinks = {},
      benefits = [],
      category,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Product name is required.' });
    }

    const payload = {
      name,
      images,
      price: price || null,
      rating: rating || null,
      affiliateLinks: {
        amazon: affiliateLinks.amazon || '',
        flipkart: affiliateLinks.flipkart || '',
      },
      benefits,
      category: category || '',
      createdAt: new Date().toISOString(),
    };

    const created = await productsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create product.', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = productsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await docRef.update(req.body);
    const updated = await docRef.get();
    return res.status(200).json({ id: updated.id, ...updated.data() });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update product.', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = productsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete product.', error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
