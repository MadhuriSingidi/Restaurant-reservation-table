const express = require('express');
const {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
} = require('../controllers/reservationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
}, createReservation);

router.get('/my', protect, getMyReservations);
router.get('/', protect, adminOnly, getAllReservations);
router.put('/:id/status', protect, adminOnly, updateReservationStatus);

module.exports = router;
