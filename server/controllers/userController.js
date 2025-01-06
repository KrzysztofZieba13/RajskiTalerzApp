const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.addToFavourites = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { favouriteProducts: productId },
    },
    { runValidators: true, new: true },
  );

  if (!user) return next(new AppError('Nie znaleziono użytkownika', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.removeFromFavourites = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { favouriteProducts: productId },
    },
    { new: true, runValidators: true },
  );

  if (!user) return next(new AppError('Nie znaleziono użytkownika', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // ERROR when user try update password using this endpoint
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'Ta trasa nie służy do aktualizacji hasła. Użyj /updateMyPassword',
        400,
      ),
    );

  const filteredBody = filterObj(req.body, 'name', 'surname', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: updatedUser });
});

exports.createEmployee = factory.createOne(User);
exports.deleteEmployee = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);
