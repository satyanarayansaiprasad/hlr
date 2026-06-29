const { v2: cloudinary } = require('cloudinary');

let isCloudinaryConfigured = false;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  isCloudinaryConfigured = true;
  console.log('Cloudinary configured successfully.');
} else {
  console.log('Cloudinary credentials missing. File uploads will fall back to local disk storage.');
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
};
