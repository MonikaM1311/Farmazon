const express = require('express');
const router = express.Router();
const {
  createOrder, getMyOrders, getOrderById,
  getFarmerOrders, updateOrderStatus,
} = require('../controllers/orderController');
const { protect, farmerOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/farmer', protect, farmerOnly, getFarmerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, farmerOnly, updateOrderStatus);

module.exports = router;
