const fs = require('fs');
const path = require('path');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

// List media resources
const getMedia = async (req, res) => {
  try {
    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: 'health-product-review',
          max_results: 100,
        });

        const files = result.resources.map((item) => ({
          id: item.public_id,
          name: item.public_id.split('/').pop(),
          url: item.secure_url,
          sizeBytes: item.bytes,
          createdAt: item.created_at,
          type: 'cloudinary',
        }));

        return res.status(200).json(files);
      } catch (err) {
        console.error('Cloudinary listing failed, falling back to local files:', err.message);
      }
    }

    // Local file scanner
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileNames = fs.readdirSync(uploadDir);
    const files = fileNames
      .filter((file) => !file.startsWith('.'))
      .map((file) => {
        const filePath = path.join(uploadDir, file);
        const stat = fs.statSync(filePath);
        return {
          id: file,
          name: file,
          url: `/uploads/${file}`,
          sizeBytes: stat.size,
          createdAt: stat.birthtime.toISOString(),
          type: 'local',
        };
      });

    // Sort by createdAt desc
    files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch media library.', error: error.message });
  }
};

// Delete media resource
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params; // For local: filename, For Cloudinary: publicId

    if (isCloudinaryConfigured && id.includes('health-product-review')) {
      await cloudinary.uploader.destroy(id);
      return res.status(200).json({ message: 'Media deleted from Cloudinary successfully.' });
    }

    // Delete local file
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    const filePath = path.join(uploadDir, id);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'Media file deleted from local storage successfully.' });
    }

    return res.status(404).json({ message: 'Media file not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete media.', error: error.message });
  }
};

module.exports = {
  getMedia,
  deleteMedia,
};
