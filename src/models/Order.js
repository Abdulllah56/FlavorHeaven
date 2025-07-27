const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  customizations: [{
    name: String,
    option: String,
    priceAdjustment: Number
  }]
});

const OrderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  orderType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'paypal', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['received', 'preparing', 'ready', 'in-delivery', 'delivered', 'cancelled'],
    default: 'received'
  },
  specialInstructions: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  estimatedDeliveryTime: {
    type: Date
  }
});

module.exports = mongoose.model('Order', OrderSchema); 