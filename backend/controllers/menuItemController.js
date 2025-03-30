const MenuItem = require('../models/MenuItem');

// GET all menu items for a restaurant
const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE menu item (admin only)
const createMenuItem = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  try {
    const newItem = await MenuItem.create({
      name,
      description,
      price,
      image,
      category,
      restaurant: req.params.restaurantId
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMenuItemsByRestaurant,
  createMenuItem,
};
