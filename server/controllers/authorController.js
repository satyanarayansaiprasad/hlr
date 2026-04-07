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
    const { name, designation, bio, profileImage } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ message: 'Name and designation are required.' });
    }

    const payload = {
      name,
      designation,
      bio: bio || '',
      profileImage: profileImage || '',
      createdAt: new Date().toISOString(),
    };

    const created = await authorsRef.add(payload);
    return res.status(201).json({ id: created.id, ...payload });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create author.', error: error.message });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
};
