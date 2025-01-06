const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/stats-order-by-method', orderController.getStatsOrdersByMethod);
router.get('/stats-order-by-day', orderController.getStatsOrdersByDay);

router.post(
  '/create-checkout-session',
  authController.protect,
  orderController.createCheckoutSession,
);

router.post(
  '/create-order',
  authController.protect,
  orderController.createOrder,
);

router.delete(
  '/delete-unpaid-order/:id',
  authController.protect,
  orderController.deleteOrderByUser,
);

router.get('/myOrders', authController.protect, orderController.getMyOrders);
router.patch(
  '/hideMyNotification/:id',
  authController.protect,
  orderController.hideNotification,
);

router.get('/ordersByProduct', orderController.getOrdersByProduct);

router.patch(
  '/updateProductInOrder/:orderId',
  orderController.updateProductInOrder,
);

router.route('/').get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder);

module.exports = router;
