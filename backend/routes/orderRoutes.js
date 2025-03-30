const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

router.post('/', protect, createOrder);             // Place new order
router.get('/my-orders', protect, getUserOrders);   // Get logged-in user's orders
router.get('/', protect, getAllOrders);             // Admin: Get all orders
router.put('/:id', protect, updateOrderStatus);     // Admin: Update order status

module.exports = router;
