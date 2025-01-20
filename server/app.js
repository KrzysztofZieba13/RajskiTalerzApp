const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const orderController = require('./controllers/orderController');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const userRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const AppError = require('./utils/appError');

const app = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:4173'],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  orderController.webhook,
);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Nie znaleziono ${req.originalUrl} na tym serwerze`));
});
app.use(globalErrorHandler);

module.exports = app;
