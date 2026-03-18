const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  const { image } = req.body; // base64 string
  if (!image) return res.status(400).json({ message: 'No image provided' });

  const result = await cloudinary.uploader.upload(image, {
    folder: 'farmazon',
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  });

  res.json({ url: result.secure_url, public_id: result.public_id });
};


module.exports = { uploadImage };
