const express = require('express');
const router = express.Router();
const { getMenuItemsByRestaurant, createMenuItem } = require('../controllers/menuItemController');
const protect = require('../middleware/authMiddleware');

router.get('/:restaurantId', getMenuItemsByRestaurant);
router.post('/:restaurantId', protect, createMenuItem);

module.exports = router;
