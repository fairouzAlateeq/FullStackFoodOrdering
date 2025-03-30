const CartItem = require('../models/CartItem');

// Get all cart items for the logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await CartItem.find({ user: req.user._id }).populate('menuItem');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;

  try {
    // Check if item already in cart
    let cartItem = await CartItem.findOne({ user: req.user._id, menuItem: menuItemId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cartItem = new CartItem({
        user: req.user._id,
        menuItem: menuItemId,
        quantity: quantity || 1,
      });
    }

    await cartItem.save();
    res.status(201).json(cartItem);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };