const Restaurant = require('../models/Restaurant');

// GET all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('owner', 'name email');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a restaurant (admin only)
const createRestaurant = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const newRestaurant = await Restaurant.create({
      name,
      description,
      image,
      owner: req.user._id
    });

    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a restaurant
const deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
};
