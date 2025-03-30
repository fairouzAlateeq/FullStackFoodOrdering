const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const MenuItem = require('../models/MenuItem');

// Create new order from user's cart
const createOrder = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate('menuItem');

    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    const orderItems = cartItems.map((item) => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.menuItem.price * item.quantity;
    }, 0);

    const newOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
    });

    // Clear cart after placing order
    await CartItem.deleteMany({ user: req.user._id });

    res.status(201).json(newOrder);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name').populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
