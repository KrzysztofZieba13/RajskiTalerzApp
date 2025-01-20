const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/stats-order-by-method',
  authController.protect,
  authController.restrictTo('admin'),
  orderController.getStatsOrdersByMethod,
);
router.get(
  '/stats-order-by-day',
  authController.protect,
  authController.restrictTo('admin'),
  orderController.getStatsOrdersByDay,
);

router.use(authController.protect);
//TODO: DESCRIBE LATER
router.post('/create-checkout-session', orderController.createCheckoutSession);

router.post('/create-order', orderController.createOrder);

//TODO: DESCRIBE LATER
router.delete('/delete-unpaid-order/:id', orderController.deleteOrderByUser);
router.get('/myOrders', orderController.getMyOrders);
router.patch('/hideMyNotification/:id', orderController.hideNotification);

// ONLY FOR STAFF
router.use(authController.restrictTo('admin', 'waiter', 'cook', 'deliveryGuy'));

router.route('/').get(orderController.getAllOrders);
router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder);
router.patch(
  '/updateProductInOrder/:orderId',
  orderController.updateProductInOrder,
);
router.get('/ordersByProduct', orderController.getOrdersByProduct);

module.exports = router;
