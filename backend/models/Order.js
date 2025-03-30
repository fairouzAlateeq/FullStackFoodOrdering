const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Out for delivery', 'Delivered'],
    default: 'Pending',
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
