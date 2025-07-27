const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendEmail } = require('../config/email');

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific contact submission
router.get('/:id', getContact, (req, res) => {
  res.json(res.contact);
});

// Create a new contact submission
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    rating: req.body.rating
  });

  try {
    const newContact = await contact.save();
    
    // Send confirmation email to customer
    const customerEmailHtml = `
      <h1>Thank you for contacting us!</h1>
      <p>Dear ${req.body.name},</p>
      <p>We have received your message and will get back to you shortly.</p>
      <p>Your message: ${req.body.message}</p>
    `;
    await sendEmail(req.body.email, 'Contact Confirmation - Flavor Heaven', customerEmailHtml);

    // Send notification to restaurant
    const restaurantEmailHtml = `
      <h1>New Contact Form Submission</h1>
      <p>Name: ${req.body.name}</p>
      <p>Email: ${req.body.email}</p>
      <p>Phone: ${req.body.phone}</p>
      <p>Subject: ${req.body.subject}</p>
      <p>Message: ${req.body.message}</p>
      <p>Rating: ${req.body.rating}</p>
    `;
    await sendEmail(process.env.RESTAURANT_EMAIL, 'New Contact Form Submission - Flavor Heaven', restaurantEmailHtml);

    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a contact submission status
router.patch('/:id', getContact, async (req, res) => {
  if (req.body.status != null) {
    res.contact.status = req.body.status;
  }

  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a contact submission
router.delete('/:id', getContact, async (req, res) => {
  try {
    await res.contact.remove();
    res.json({ message: 'Contact submission deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get contact submissions by status
router.get('/status/:status', async (req, res) => {
  try {
    const contacts = await Contact.find({ status: req.params.status });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get contact by ID
async function getContact(req, res, next) {
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.contact = contact;
  next();
}

module.exports = router;