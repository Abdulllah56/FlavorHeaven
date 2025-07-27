const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    customer: req.body.customer,
    items: req.body.items,
    subtotal: req.body.subtotal,
    tax: req.body.tax,
    deliveryFee: req.body.deliveryFee,
    total: req.body.total,
    orderType: req.body.orderType,
    paymentMethod: req.body.paymentMethod,
    specialInstructions: req.body.specialInstructions
  });

  try {
    const newOrder = await order.save();
    
    // Here you would typically integrate with a payment gateway like Stripe
    // For demonstration purposes, we'll just mark the order as paid
    if (req.body.paymentMethod !== 'cash') {
      newOrder.paymentStatus = 'paid';
      await newOrder.save();
    }
    
    // Set estimated delivery time (30 minutes from now for delivery orders)
    if (newOrder.orderType === 'delivery') {
      const deliveryTime = new Date();
      deliveryTime.setMinutes(deliveryTime.getMinutes() + 30);
      newOrder.estimatedDeliveryTime = deliveryTime;
      await newOrder.save();
    }
    
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an order status
router.patch('/:id/status', getOrder, async (req, res) => {
  if (req.body.orderStatus) {
    res.order.orderStatus = req.body.orderStatus;
  }
  
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update payment status
router.patch('/:id/payment', getOrder, async (req, res) => {
  if (req.body.paymentStatus) {
    res.order.paymentStatus = req.body.paymentStatus;
  }
  
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel an order
router.patch('/:id/cancel', getOrder, async (req, res) => {
  // Only allow cancellation if the order is not already delivered or cancelled
  if (['delivered', 'cancelled'].includes(res.order.orderStatus)) {
    return res.status(400).json({ message: 'Cannot cancel an order that is already delivered or cancelled' });
  }
  
  res.order.orderStatus = 'cancelled';
  
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get orders by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.params.email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

module.exports = router; 