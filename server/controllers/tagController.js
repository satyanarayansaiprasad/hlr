const db = require('../config/firebase');

const postsRef = db.collection('posts');

const getTags = async (req, res) => {
  try {
    const postsSnapshot = await postsRef.get();
    const tagCountMap = {};

    postsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.deletedAt) return; // skip soft deleted

      const tags = data.tags || [];
      const keywords = data.keywords || [];
      const combined = Array.from(new Set([...tags, ...keywords]));

      combined.forEach((tag) => {
        if (!tag) return;
        const normalized = tag.trim();
        tagCountMap[normalized] = (tagCountMap[normalized] || 0) + 1;
      });
    });

    const tagsList = Object.keys(tagCountMap).map((name) => ({
      name,
      count: tagCountMap[name],
    }));

    // Sort by count desc
    tagsList.sort((a, b) => b.count - a.count);

    return res.status(200).json(tagsList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tags.', error: error.message });
  }
};

const mergeTags = async (req, res) => {
  try {
    const { sourceTag, targetTag } = req.body;

    if (!sourceTag || !targetTag) {
      return res.status(400).json({ message: 'Both sourceTag and targetTag are required.' });
    }

    const postsSnapshot = await postsRef.get();
    let updatedCount = 0;

    for (const doc of postsSnapshot.docs) {
      const data = doc.data();
      let changed = false;

      let tags = data.tags || [];
      let keywords = data.keywords || [];

      // Check tags
      if (tags.includes(sourceTag)) {
        tags = tags.map((t) => (t === sourceTag ? targetTag : t));
        // Remove duplicates
        tags = Array.from(new Set(tags));
        changed = true;
      }

      // Check keywords
      if (keywords.includes(sourceTag)) {
        keywords = keywords.map((k) => (k === sourceTag ? targetTag : k));
        keywords = Array.from(new Set(keywords));
        changed = true;
      }

      if (changed) {
        await postsRef.doc(doc.id).update({ tags, keywords });
        updatedCount += 1;
      }
    }

    return res.status(200).json({
      message: `Successfully merged tag "${sourceTag}" into "${targetTag}".`,
      updatedPostsCount: updatedCount,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to merge tags.', error: error.message });
  }
};

module.exports = {
  getTags,
  mergeTags,
};
