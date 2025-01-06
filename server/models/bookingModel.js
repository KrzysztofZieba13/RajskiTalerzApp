const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guestsNumber: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  bookingDate: {
    type: Date,
    required: [true, 'Data rezerwacji jest wymagana'],
    min: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clientName: {
    type: String,
    default: 'Nie podano',
  },
  clientEmail: {
    type: String,
    lowercase: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'Oczekiwanie',
    enum: ['Oczekiwanie', 'Zatwierdzono', 'Odrzucono'],
  },
  isVisibleNotification: {
    type: Boolean,
    default: true,
  },
  bookingComment: {
    type: String,
    maxLength: [500, 'Komentarz może mieć maksymalnie 500 znaków'],
    trim: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
