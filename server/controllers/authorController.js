const db = require('../config/firebase');

const authorsRef = db.collection('authors');

const getAuthors = async (req, res) => {
  try {
    const snapshot = await authorsRef.get();
    const authors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch authors.', error: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, designation, bio, profileImage, specialization = [] } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ message: 'Name and designation are required.' });
    }

    const payload = {
      name,
      designation,
      avatar: profileImage || '/assets/images/doctor.png',
      role: designation, // mapping designations to role for client consistency
      bio: bio || 'Medical researcher passionate about uncovering the science behind consumer supplements.',
      specialization: Array.isArray(specialization) ? specialization : [specialization],
      createdAt: new Date().toISOString(),
    };

    const created = await authorsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create author.', error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = authorsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    const updates = { ...req.body };
    if (updates.profileImage) {
      updates.avatar = updates.profileImage;
      delete updates.profileImage;
    }
    if (updates.designation) {
      updates.role = updates.designation;
    }

    await docRef.update(updates);
    const updated = await docRef.get();
    return res.status(200).json({ id: updated.id, ...updated.data() });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update author.', error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = authorsRef.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ message: 'Author deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete author.', error: error.message });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
