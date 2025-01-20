const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.createProduct,
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProduct,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct,
  );

module.exports = router;
