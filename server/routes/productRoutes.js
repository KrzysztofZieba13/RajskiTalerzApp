const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.createProduct,
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
