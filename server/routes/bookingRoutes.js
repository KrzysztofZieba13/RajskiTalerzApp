const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.post('/', bookingController.sendBookingEmail);
router.get('/myBookings', bookingController.getMyBookings);
router.patch('/hideMyNotification/:id', bookingController.hideNotification);

// Only for admin and waiter
router.use(authController.restrictTo('admin', 'waiter'));
router.get('/', bookingController.getAllBookings);
router.patch('/:id', bookingController.updateBooking);

module.exports = router;
