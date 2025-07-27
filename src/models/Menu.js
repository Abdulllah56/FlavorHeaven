const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'main-dishes', 'fast-food', 'desserts']
  },
  image: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  dietaryTags: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'spicy']
  }],
  customizationOptions: [{
    name: String,
    options: [String],
    priceAdjustment: Number
  }],
  featured: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
MenuItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MenuItem', MenuItemSchema); 