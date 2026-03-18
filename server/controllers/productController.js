const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;
  const query = {};
  if (category && category !== 'all') query.category = category;
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];

  const sortObj = sort === 'price_asc' ? { price: 1 }
    : sort === 'price_desc' ? { price: -1 }
    : sort === 'newest' ? { createdAt: -1 }
    : { createdAt: -1 };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('farmerId', 'name');

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('farmerId', 'name email');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

const createProduct = async (req, res) => {
  const { name, description, price, category, image, harvestDate, stock, unit } = req.body;
  const product = await Product.create({
    name, description, price, category, image, harvestDate, stock, unit,
    farmerId: req.user._id,
    farmerName: req.user.name,
  });
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.farmerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.farmerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};

const getFarmerProducts = async (req, res) => {
  const products = await Product.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
  res.json(products);
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getFarmerProducts };
