const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ category: req.params.category });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured menu items
router.get('/featured', async (req, res) => {
  try {
    const featuredItems = await MenuItem.find({ featured: true });
    res.json(featuredItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific menu item
router.get('/:id', getMenuItem, (req, res) => {
  res.json(res.menuItem);
});

// Create a new menu item
router.post('/', async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    gallery: req.body.gallery,
    dietaryTags: req.body.dietaryTags,
    customizationOptions: req.body.customizationOptions,
    featured: req.body.featured,
    available: req.body.available
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a menu item
router.patch('/:id', getMenuItem, async (req, res) => {
  if (req.body.name != null) {
    res.menuItem.name = req.body.name;
  }
  if (req.body.description != null) {
    res.menuItem.description = req.body.description;
  }
  if (req.body.price != null) {
    res.menuItem.price = req.body.price;
  }
  if (req.body.category != null) {
    res.menuItem.category = req.body.category;
  }
  if (req.body.image != null) {
    res.menuItem.image = req.body.image;
  }
  if (req.body.gallery != null) {
    res.menuItem.gallery = req.body.gallery;
  }
  if (req.body.dietaryTags != null) {
    res.menuItem.dietaryTags = req.body.dietaryTags;
  }
  if (req.body.customizationOptions != null) {
    res.menuItem.customizationOptions = req.body.customizationOptions;
  }
  if (req.body.featured != null) {
    res.menuItem.featured = req.body.featured;
  }
  if (req.body.available != null) {
    res.menuItem.available = req.body.available;
  }

  try {
    const updatedMenuItem = await res.menuItem.save();
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a menu item
router.delete('/:id', getMenuItem, async (req, res) => {
  try {
    await res.menuItem.remove();
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get menu item by ID
async function getMenuItem(req, res, next) {
  let menuItem;
  try {
    menuItem = await MenuItem.findById(req.params.id);
    if (menuItem == null) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.menuItem = menuItem;
  next();
}

module.exports = router; 