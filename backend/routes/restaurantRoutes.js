const express = require('express');
const router = express.Router();
const { getRestaurants, createRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');

router.get('/', getRestaurants);
router.post('/', protect, createRestaurant);
router.delete('/:id', protect, deleteRestaurant);

module.exports = router;
