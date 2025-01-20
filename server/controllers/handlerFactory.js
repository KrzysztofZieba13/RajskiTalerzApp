const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query).filter().sort();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError('Nie znaleziono dokumentów', 404));
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        new AppError('Nie znaleziono dokumentu o podanym identyfikatorze', 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    if (req.user) req.body.userId = req.user._id;
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError('Nie udało się utworzyć dokumentu', 400));
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError('Nie znaleziono dokumentu o podanym identyfikatorze', 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);

    if (!doc)
      return next(new AppError('Nie znaleziono dokumentu z takim ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.hideNotification = (Model) =>
  catchAsync(async (req, res) => {
    const notifId = req.params.id;

    const doc = await Model.findByIdAndUpdate(
      notifId,
      { isVisibleNotification: false },
      { new: true },
    );

    if (!doc) return next(new AppError('Nie znaleziono powiadomienia', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
