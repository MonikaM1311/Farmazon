const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { products, deliveryAddress, paymentMethod } = req.body;
  if (!products?.length) return res.status(400).json({ message: 'No products in order' });

  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const order = await Order.create({
    userId: req.user._id,
    products,
    totalPrice,
    deliveryAddress,
    paymentMethod,
  });
  res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(order);
};

const getFarmerOrders = async (req, res) => {
  // Get all products by this farmer
  const farmerProducts = await Product.find({ farmerId: req.user._id }).select('_id');
  const productIds = farmerProducts.map((p) => p._id.toString());

  const orders = await Order.find({
    'products.productId': { $in: productIds },
  }).sort({ createdAt: -1 });

  // Filter products in each order to only farmer's products
  const filtered = orders.map((o) => ({
    ...o.toObject(),
    products: o.products.filter((p) => productIds.includes(p.productId?.toString())),
  }));

  res.json(filtered);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status;
  await order.save();
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getOrderById, getFarmerOrders, updateOrderStatus };
