
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

// Environment validation for production
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'RESTAURANT_EMAIL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`⚠️  Warning: Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('📧 Email functionality may not work properly');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for deployment
app.set('trust proxy', 1);

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, /\.replit\.dev$/, /\.repl\.co$/]
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve CSS files from src directory
app.use('/src', express.static('src'));

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Simple in-memory data storage (for demonstration)
let menuItems = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs",
    price: 24.99,
    category: "mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    available: true
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Classic Caesar with croutons and parmesan",
    price: 12.99,
    category: "salads",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    available: true
  },
  {
    id: 3,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with vanilla ice cream",
    price: 8.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    available: true
  }
];

let reservations = [];
let orders = [];
let contacts = [];

// Simple API routes without database
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/menu/category/:category', (req, res) => {
  const filteredItems = menuItems.filter(item => item.category === req.params.category);
  res.json(filteredItems);
});

app.post('/api/reservations', (req, res) => {
  console.log('Reservation form received:', req.body);
  
  const reservation = {
    id: reservations.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    guests: req.body.guests,
    specialRequests: req.body['special-requests'],
    status: 'confirmed',
    createdAt: new Date()
  };
  
  reservations.push(reservation);
  console.log('Reservation saved:', reservation);
  console.log('Total reservations:', reservations.length);
  
  res.status(201).json({
    message: 'Reservation confirmed successfully',
    reservation: reservation
  });
});

// Get all reservations (for debugging)
app.get('/api/reservations', (req, res) => {
  res.json({
    message: 'All reservation submissions',
    reservations: reservations,
    total: reservations.length
  });
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: orders.length + 1,
    ...req.body,
    orderStatus: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date()
  };
  orders.push(order);
  res.status(201).json(order);
});

app.post('/api/contact', (req, res) => {
  console.log('Contact form received:', req.body);
  
  const contact = {
    id: contacts.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    rating: req.body.rating,
    status: 'new',
    createdAt: new Date()
  };
  
  contacts.push(contact);
  console.log('Contact saved:', contact);
  console.log('Total contacts:', contacts.length);
  
  res.status(201).json({
    message: 'Contact form submitted successfully',
    contact: contact
  });
});

// Get all contacts (for debugging)
app.get('/api/contacts', (req, res) => {
  res.json({
    message: 'All contact submissions',
    contacts: contacts,
    total: contacts.length
  });
});

// Serve static files for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
  console.log('💾 Database functionality removed - using in-memory storage');
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🎯 Production mode - Server ready for deployment');
  } else {
    console.log('🔧 Development mode - Local development server');
  }
});
