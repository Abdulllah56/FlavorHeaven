const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { sendEmail } = require('../config/email');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific reservation
router.get('/:id', getReservation, (req, res) => {
  res.json(res.reservation);
});

// Create a new reservation
router.post('/', async (req, res) => {
  const reservation = new Reservation({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    guests: req.body.guests,
    specialRequests: req.body.specialRequests
  });

  try {
    // Check if the requested time slot is available
    const existingReservations = await Reservation.find({
      date: req.body.date,
      time: req.body.time,
      status: { $ne: 'cancelled' }
    });

    // Simple availability check (can be enhanced based on restaurant capacity)
    const totalGuests = existingReservations.reduce((sum, res) => sum + res.guests, 0);
    if (totalGuests + req.body.guests > 50) { // Assuming restaurant capacity is 50
      return res.status(400).json({ message: 'No availability for the requested time and party size' });
    }

    const newReservation = await reservation.save();

    // Send confirmation email to customer
    const customerEmailHtml = `
      <h1>Reservation Confirmation</h1>
      <p>Dear ${req.body.name},</p>
      <p>Your reservation has been confirmed for ${req.body.date} at ${req.body.time}.</p>
      <p>Number of guests: ${req.body.guests}</p>
      <p>Special requests: ${req.body.specialRequests || 'None'}</p>
    `;
    await sendEmail(req.body.email, 'Reservation Confirmation - Flavor Heaven', customerEmailHtml);

    // Send notification to restaurant
    const restaurantEmailHtml = `
      <h1>New Reservation</h1>
      <p>Customer: ${req.body.name}</p>
      <p>Date: ${req.body.date}</p>
      <p>Time: ${req.body.time}</p>
      <p>Guests: ${req.body.guests}</p>
      <p>Contact: ${req.body.email} / ${req.body.phone}</p>
      <p>Special requests: ${req.body.specialRequests || 'None'}</p>
    `;
    await sendEmail(process.env.RESTAURANT_EMAIL, 'New Reservation - Flavor Heaven', restaurantEmailHtml);

    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a reservation
router.patch('/:id', getReservation, async (req, res) => {
  if (req.body.name != null) {
    res.reservation.name = req.body.name;
  }
  if (req.body.email != null) {
    res.reservation.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.reservation.phone = req.body.phone;
  }
  if (req.body.date != null) {
    res.reservation.date = req.body.date;
  }
  if (req.body.time != null) {
    res.reservation.time = req.body.time;
  }
  if (req.body.guests != null) {
    res.reservation.guests = req.body.guests;
  }
  if (req.body.specialRequests != null) {
    res.reservation.specialRequests = req.body.specialRequests;
  }
  if (req.body.status != null) {
    res.reservation.status = req.body.status;
  }

  try {
    const updatedReservation = await res.reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel a reservation
router.patch('/:id/cancel', getReservation, async (req, res) => {
  res.reservation.status = 'cancelled';

  try {
    const updatedReservation = await res.reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check availability for a given date and time
router.get('/check-availability/:date/:time/:guests', async (req, res) => {
  try {
    const { date, time, guests } = req.params;
    const existingReservations = await Reservation.find({
      date: new Date(date),
      time: time,
      status: { $ne: 'cancelled' }
    });

    const totalGuests = existingReservations.reduce((sum, res) => sum + res.guests, 0);
    const isAvailable = totalGuests + parseInt(guests) <= 50; // Assuming restaurant capacity is 50

    res.json({ available: isAvailable });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get reservation by ID
async function getReservation(req, res, next) {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reservation = reservation;
  next();
}

module.exports = router;