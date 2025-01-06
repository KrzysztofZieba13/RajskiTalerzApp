const multer = require('multer');
const sharp = require('sharp');
const { promisify } = require('node:util');
const fs = require('node:fs');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else
    cb(
      new AppError('To nie jest obraz! Przesyłaj jedynie zdjęcia.', 400),
      false,
    );
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.showBody = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'xD' });
});

exports.uploadProductImage = upload.single('image');

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${req.user.id}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(160, 120)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/product-images/${req.file.filename}`);

  req.body.image = req.file.filename;
  next();
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) return next(new AppError('Nie znaleziono produktu.', 404));

  await promisify(fs.rm)(`public/product-images/${product.image}`);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createProduct = factory.createOne(Product);
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
