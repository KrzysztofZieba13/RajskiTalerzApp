const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dayjs = require('dayjs');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Email = require('../utils/email');

const endpointSecret =
  'whsec_58b9f69399b4bf3ad6aa0c6df89534911a3e01f580a1e28f9d5c18cbee54c2ee';

const createOrderCheckout = async (sessionId) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  });

  if (checkoutSession.payment_status === 'paid') {
    const order = await Order.findOneAndUpdate(
      { checkoutId: sessionId },
      { isPaid: true },
      { new: true, runValidators: true },
    );

    await new Email(
      null,
      '',
      { orderId: order._id },
      checkoutSession.customer_email,
    ).sendCheckoutOrderPaid();
  }
};

exports.webhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res
      .status(400)
      .json({ status: 'success', message: `Webhook Error: ${err.message}` });
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const paymentIntentSucceeded = event.data.object;
    createOrderCheckout(paymentIntentSucceeded.id);
  }

  res.status(200).json({ received: true });
};

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { products, clientData } = req.body;

  const orderProductsIDs = products.map((product) => product.itemId);
  const productsFromDB = await Product.find({
    _id: { $in: orderProductsIDs },
  });

  req.body.userId = userId;
  req.body.isPaid = false;
  const newOrder = await Order.create(req.body);

  const session = await stripe.checkout.sessions.create({
    line_items: productsFromDB.map((product, i) => ({
      price_data: {
        product_data: {
          name: product.name,
          description: product.ingredients.join(', '),
        },
        unit_amount: product.price * 100,
        currency: 'pln',
      },
      quantity: products.at(i).quantity,
    })),
    customer_email: clientData.email,
    client_reference_id: `${userId}`,
    mode: 'payment',
    success_url: `${req.protocol}://${process.env.BASE_URL}/order-success?orderId=${newOrder._id}`,
    cancel_url: `${req.protocol}://${process.env.BASE_URL}/order-fail?orderId=${newOrder._id}`,
  });

  newOrder.checkoutId = session.id;
  await newOrder.save();

  let totalPrice = 0;
  const productsDBAndQuantity = productsFromDB.map((product, i) => {
    totalPrice += products.at(i).quantity * product.price;
    return { product, quantity: products.at(i).quantity, isReady: false };
  });

  await new Email(
    req.user,
    '',
    {
      products: productsDBAndQuantity,
      totalPrice,
      orderId: newOrder._id,
    },
    clientData.email,
  ).sendCheckoutConfirm();

  res.status(200).json({ url: session.url });
});

exports.getStatsOrdersByDay = catchAsync(async (req, res, next) => {
  const today = new Date();

  const stats = await Order.aggregate([
    {
      $match: {
        date: {
          $gte: dayjs(today).subtract(30, 'day').toDate(),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: '$date' },
        numOrderInDay: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 1,
        weekday: {
          $arrayElemAt: [
            ['', 'Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'],
            '$_id',
          ],
        },
        numOrderInDay: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.getStatsOrdersByMethod = catchAsync(async (req, res, next) => {
  const today = new Date();

  const stats = await Order.aggregate([
    {
      $match: {
        date: {
          $gte: dayjs(today).subtract(30, 'day').toDate(),
        },
      },
    },
    {
      $group: {
        _id: '$deliveryMethod',
        numOrderMethod: { $sum: 1 },
      },
    },
    { $addFields: { method: '$_id' } },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const features = new APIFeatures(Order.find({ userId }), req.query)
    .filter()
    .sort();
  const userOrders = await features.query;
  //TODO: error handling

  res.status(200).json({
    status: 'success',
    results: userOrders.length,
    data: userOrders,
  });
});

exports.getOrdersByProduct = catchAsync(async (req, res, next) => {
  const { productName } = req.query;

  const product = await Product.findOne({ name: productName });
  if (!product)
    return next(
      new AppError('Nie znaleziono zamówienia z danym produktem', 404),
    );

  const orders = await Order.find({
    status: 'W realizacji',
    'products.product': product._id,
  }).populate({
    path: 'products.product',
  });

  res
    .status(200)
    .json({ status: 'success', length: orders.length, data: orders });
});

exports.updateProductInOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { productId, newStatus } = req.body;

  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      'products.product': productId,
    },
    { $set: { 'products.$.isReady': newStatus } },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({ status: 'success', data: order });
});

exports.hideNotification = factory.hideNotification(Order);

exports.createOrder = factory.createOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.updateOrder = factory.updateOne(Order);

exports.deleteOrderByUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOneAndDelete({
    _id: id,
    isPaid: false,
    userId: req.user._id,
  });

  if (!order)
    return next(new AppError('Nie znaleziono zamówienia o takim ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
