const AppError = require('../utils/appError');

const handleValidationErrorDB = (err) => {
  const message = err.message;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplikat w polu: ${err.keyValue.email}. Użyj innej wartości.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  console.log(err);
  // console.log(err.message);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // console.error('ERROR 🔥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Coś poszło nie tak!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
};
