// Load environment variables from .env.local file
require('dotenv').config({ path: '.env.local' });

// Verify email configuration
const emailConfigured = process.env.EMAIL_USER && 
                       process.env.EMAIL_PASSWORD && 
                       process.env.RESTAURANT_EMAIL;

if (emailConfigured) {
  console.log('✅ Email configuration loaded successfully.');
  console.log(`📧 Email configured with: ${process.env.EMAIL_USER}`);
} else {
  console.warn('⚠️ Email configuration is missing. Email features will be disabled.');
  if (!process.env.EMAIL_USER) console.warn('Missing EMAIL_USER environment variable');
  if (!process.env.EMAIL_PASSWORD) console.warn('Missing EMAIL_PASSWORD environment variable');
  if (!process.env.RESTAURANT_EMAIL) console.warn('Missing RESTAURANT_EMAIL environment variable');
}

const express = require('express');
const path = require('path');
const cors = require('cors');

// Environment validation for all environments
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'RESTAURANT_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`⚠️  Warning: Missing environment variables: ${missingVars.join(', ')}`);
  console.warn('📧 Email functionality may not work properly');
} else {
  console.log(`📧 Email configuration loaded successfully. Restaurant will receive contact forms at: ${process.env.RESTAURANT_EMAIL}`);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for deployment
app.set('trust proxy', 1);

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, /\.vercel\.app$/, /\.replit\.dev$/, /\.repl\.co$/]
    : ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

console.log('🔒 CORS configured to allow requests from:', corsOptions.origin);

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

// Add a route to handle CORS preflight requests for all API endpoints
app.options('/api/*', cors(corsOptions));

// Add a route to check if the server is properly configured
app.get('/api/config-check', (req, res) => {
  const emailConfigured = process.env.EMAIL_USER && 
                         process.env.EMAIL_PASSWORD && 
                         process.env.RESTAURANT_EMAIL;
  
  res.json({
    server: {
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    },
    cors: {
      enabled: true,
      allowedOrigins: Array.isArray(corsOptions.origin) ? corsOptions.origin : ['all origins']
    },
    email: {
      configured: !!emailConfigured,
      sender: emailConfigured ? process.env.EMAIL_USER : null,
      receiver: emailConfigured ? process.env.RESTAURANT_EMAIL : null
    }
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

// Import mongoose and Contact model with error handling
let mongoose, Contact;
try {
  mongoose = require('mongoose');
  Contact = require('./src/models/Contact');
} catch (error) {
  console.warn('⚠️ MongoDB dependencies not found - contact form will work without database storage');
}

// Simple API routes without database
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/menu/category/:category', (req, res) => {
  const filteredItems = menuItems.filter(item => item.category === req.params.category);
  res.json(filteredItems);
});

app.post('/api/reservations', async (req, res) => {
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
  
  // Send email if email configuration is available
  if (emailConfigured) {
    try {
      // Import the email module with error handling
      const emailModule = require('./src/config/email');
      
      console.log('📧 Attempting to send reservation emails with configured credentials');
      
      // Send notification to restaurant
      const restaurantEmailHtml = `
        <h2>New Reservation - Flavor Heaven</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>Reservation Details:</h3>
          <p><strong>Name:</strong> ${reservation.name}</p>
          <p><strong>Email:</strong> ${reservation.email}</p>
          <p><strong>Phone:</strong> ${reservation.phone}</p>
          <p><strong>Date:</strong> ${reservation.date}</p>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Number of Guests:</strong> ${reservation.guests}</p>
          ${reservation.specialRequests ? `<p><strong>Special Requests:</strong> ${reservation.specialRequests}</p>` : ''}
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d35400; margin: 10px 0;">
            <p><strong>Status:</strong> ${reservation.status}</p>
            <p><strong>Reservation ID:</strong> #${reservation.id}</p>
          </div>
          
          <p><small>Submitted on: ${reservation.createdAt.toLocaleString()}</small></p>
        </div>
      `;

      // Send notification to restaurant
      await emailModule.sendEmail(
        process.env.RESTAURANT_EMAIL,
        `New Reservation: ${reservation.name} - ${reservation.date} at ${reservation.time}`,
        restaurantEmailHtml
      );
      
      console.log('✅ Restaurant notification email sent successfully');

      // Send confirmation to customer
      const customerEmailHtml = `
        <h2>Reservation Confirmed - Flavor Heaven</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Dear ${reservation.name},</p>
          
          <p>Thank you for choosing Flavor Heaven! Your reservation has been confirmed.</p>
          
          <h3>Your Reservation Details:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e53e3e; margin: 10px 0;">
            <p><strong>Date:</strong> ${reservation.date}</p>
            <p><strong>Time:</strong> ${reservation.time}</p>
            <p><strong>Number of Guests:</strong> ${reservation.guests}</p>
            <p><strong>Reservation ID:</strong> #${reservation.id}</p>
            ${reservation.specialRequests ? `<p><strong>Special Requests:</strong> ${reservation.specialRequests}</p>` : ''}
          </div>
          
          <h3>Restaurant Information:</h3>
          <p><strong>Address:</strong> 123 Main Street, City, State 12345</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          
          <p>If you need to make any changes to your reservation, please contact us at least 2 hours before your scheduled time.</p>
          
          <p>We look forward to serving you!</p>
          
          <p>Best regards,<br>The Flavor Heaven Team</p>
        </div>
      `;

      // Send confirmation to customer
      await emailModule.sendEmail(
        reservation.email,
        'Reservation Confirmed - Flavor Heaven',
        customerEmailHtml
      );
      
      console.log(`✅ Customer confirmation email sent successfully to ${reservation.email}`);
      console.log('📧 Reservation emails sent successfully');
      
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Don't fail the entire request if email fails
    }
  } else {
    console.log('📧 Email not configured - reservation saved without sending emails');
  }
  
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

// Add a route specifically for handling cross-origin contact form submissions
app.options('/api/contact', cors(corsOptions));

// Connect to MongoDB if available
if (process.env.MONGODB_URI && mongoose) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
  console.warn('⚠️ MongoDB URI not provided or mongoose not available - contact form will work without database storage');
}

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message, rating } = req.body;

  try {
    let newContact;
    
    // Try to save to database if available
    if (Contact && mongoose) {
      try {
        newContact = new Contact({
          name,
          email,
          phone,
          subject,
          message,
          rating,
          status: 'new',
          createdAt: new Date()
        });

        await newContact.save();
        console.log('✅ Contact saved to MongoDB:', newContact);
      } catch (dbError) {
        console.warn('⚠️ Failed to save to database, continuing without database storage:', dbError.message);
        // Create a simple object if database save fails
        newContact = {
          name,
          email,
          phone,
          subject,
          message,
          rating,
          status: 'new',
          createdAt: new Date()
        };
      }
    } else {
      // Create a simple object if no database
      newContact = {
        name,
        email,
        phone,
        subject,
        message,
        rating,
        status: 'new',
        createdAt: new Date()
      };
      console.log('📝 Contact form data processed (no database):', newContact);
    }
  
    // Send email if email configuration is available
    if (emailConfigured) {
      try {
        // Import the email module with error handling
        const emailModule = require('./src/config/email');
        
        console.log('📧 Attempting to send contact form emails');
        
        // Send notification to restaurant
        const restaurantEmailHtml = `
          <h2>New Contact Form Submission - Flavor Heaven</h2>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${newContact.name}</p>
            <p><strong>Email:</strong> ${newContact.email}</p>
            <p><strong>Phone:</strong> ${newContact.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${newContact.subject}</p>
            <p><strong>Rating:</strong> ${newContact.rating ? '⭐'.repeat(newContact.rating) + ` (${newContact.rating}/5)` : 'Not provided'}</p>
            
            <h3>Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d35400; margin: 10px 0;">
              <p>${newContact.message}</p>
            </div>
            
            <p><small>Submitted on: ${newContact.createdAt.toLocaleString()}</small></p>
          </div>
        `;

        // Send notification to restaurant
        await emailModule.sendEmail(
          process.env.RESTAURANT_EMAIL,
          `New Contact Form: ${newContact.subject} - ${newContact.name}`,
          restaurantEmailHtml
        );
        
        console.log('✅ Restaurant notification email sent successfully');

        // Send confirmation to customer
        const customerEmailHtml = `
          <h2>Thank you for contacting Flavor Heaven!</h2>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Dear ${newContact.name},</p>
            
            <p>We have received your message and will get back to you shortly.</p>
            
            <h3>Your Message Summary:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e53e3e;">
              <p><strong>Subject:</strong> ${newContact.subject}</p>
              <p><strong>Message:</strong> ${newContact.message}</p>
              ${newContact.rating ? `<p><strong>Rating:</strong> ${'⭐'.repeat(newContact.rating)} (${newContact.rating}/5)</p>` : ''}
            </div>
            
            <p>We appreciate your feedback and will respond as soon as possible.</p>
            
            <p>Best regards,<br>The Flavor Heaven Team</p>
          </div>
        `;

        // Send confirmation to customer
        await emailModule.sendEmail(
          newContact.email,
          'Thank you for contacting Flavor Heaven!',
          customerEmailHtml
        );
        
        console.log(`✅ Customer confirmation email sent successfully to ${newContact.email}`);
        console.log('📧 Contact form emails sent successfully');
        
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('📧 Email not configured - contact form saved without sending emails');
    }
    
    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form.', error: error.message });
  }
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
  console.log(`📧 Email configured: ${emailConfigured ? 'Yes' : 'No'}`);
  console.log('💾 Using in-memory storage with optional database support');
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🎯 Production mode - Server ready for deployment');
  } else {
    console.log('🔧 Development mode - Local development server');
  }
});