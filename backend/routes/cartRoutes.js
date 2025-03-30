const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart);

module.exports = router;
