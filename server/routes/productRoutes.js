const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct, getFarmerProducts,
} = require('../controllers/productController');
const { protect, farmerOnly } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/my', protect, farmerOnly, getFarmerProducts);
router.get('/:id', getProductById);
router.post('/', protect, farmerOnly, createProduct);
router.put('/:id', protect, farmerOnly, updateProduct);
router.delete('/:id', protect, farmerOnly, deleteProduct);

module.exports = router;
