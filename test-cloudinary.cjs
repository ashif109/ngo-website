require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary Connection...');

// Upload a sample base64 image (1x1 pixel)
const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

cloudinary.uploader.upload(sampleImage, { folder: "gurukulam-ngo-test" })
  .then(result => {
    console.log('SUCCESS! Uploaded to:', result.secure_url);
    // Cleanup
    return cloudinary.uploader.destroy(result.public_id);
  })
  .then(() => console.log('Cleanup successful.'))
  .catch(err => {
    console.error('ERROR uploading to Cloudinary:', err);
  });
