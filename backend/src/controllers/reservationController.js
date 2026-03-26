const Reservation = require('../models/Reservation');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Public
const createReservation = async (req, res) => {
  const { name, phone, email, date, time, guests, specialRequest } = req.body;

  try {
    const reservation = new Reservation({
      name,
      phone,
      email,
      date,
      time,
      guests,
      specialRequest,
      user: req.user ? req.user._id : null
    });

    const createdReservation = await reservation.save();
    res.status(201).json({ success: true, data: createdReservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user reservations
// @route   GET /api/reservations/my
// @access  Private
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ date: -1, time: -1 });
    res.json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin
const updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      reservation.status = req.body.status || reservation.status;
      const updatedReservation = await reservation.save();
      res.json({ success: true, data: updatedReservation });
    } else {
      res.status(404).json({ success: false, message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReservation, getMyReservations, getAllReservations, updateReservationStatus };
