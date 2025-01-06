const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, bookingController.sendBookingEmail)
  .get(authController.protect, bookingController.getAllBookings);

router.get(
  '/myBookings',
  authController.protect,
  bookingController.getMyBookings,
);

router.patch('/:id', authController.protect, bookingController.updateBooking);

router.patch(
  '/hideMyNotification/:id',
  authController.protect,
  bookingController.hideNotification,
);

module.exports = router;
