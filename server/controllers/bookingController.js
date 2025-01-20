const Booking = require('../models/bookingModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const dayjs = require('dayjs');

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Booking.find({ userId: req.user._id }),
    req.query,
  ).filter();

  const userBookings = await features.query;

  res.status(200).json({
    status: 'success',
    length: userBookings.length,
    data: userBookings,
  });
});

exports.sendBookingEmail = catchAsync(async (req, res, next) => {
  if (!req.body.clientEmail) req.body.clientEmail = req.user.email;
  req.body.userId = req.user._id;
  const booking = await Booking.create(req.body);

  if (!booking)
    return next(new AppError('Nie udało się złożyć rezerwacji', 400));

  await new Email(
    req.user,
    '',
    {
      bookingId: booking._id,
    },
    req.body.clientEmail,
  ).sendBookingRequestConfirm();

  res.status(200).json({
    status: 'success',
    data: {
      data: booking,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) return next(new AppError('Nie znaleziono rezerwacji.', 404));

  const formattedBookingDate = dayjs(booking.bookingDate).isValid()
    ? dayjs(booking.bookingDate).format('DD-MM-YYYY HH:mm:ss')
    : 'Niepoprawna data';

  await new Email(
    null,
    '',
    {
      bookingId: booking._id,
      booking,
      bookingDate: formattedBookingDate,
    },
    booking.clientEmail,
  ).sendBookingResponse();

  res.status(200).json({
    status: 'success',
    data: {
      data: booking,
    },
  });
});

exports.hideNotification = factory.hideNotification(Booking);
exports.getAllBookings = factory.getAll(Booking);
