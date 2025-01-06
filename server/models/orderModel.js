const mongoose = require('mongoose');
const validator = require('validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Podaj swoje imię'],
  },
  telephone: {
    type: String,
    validate: [validator.isMobilePhone, 'Podaj poprawny numer telefonu'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Podaj poprawny adress email'],
  },
});

const deliverySchema = new mongoose.Schema({
  street: String,
  buildingNumber: Number,
  city: String,
  localNumber: Number,
  postalCose: String,
  floor: Number,
  deliveryComment: String,
  coordinates: Object,
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clientData: { type: personSchema, required: [true, 'Podaj dane klienta'] },
    date: {
      type: Date,
      default: Date.now,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
          },
          isReady: {
            type: Boolean,
            default: false,
          },
          quantity: {
            type: Number,
            required: [true, 'Produkt musi mieć podaną ilość w zamówieniu'],
          },
        },
      ],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: 'Zamówienie nie zawiera żadnych produktów',
      },
    },
    status: {
      type: String,
      enum: ['W realizacji', 'Gotowe', 'Dostarczone', 'W drodze'],
      default: 'W realizacji',
    },
    isVisibleNotification: {
      type: Boolean,
      default: true,
    },
    idDeliveryGuy: { type: String, default: null },
    deliveryData: deliverySchema,
    deliveryMethod: {
      type: String,
      enum: ['dostawa', 'odbiór', 'stolik'],
      required: [true, 'Wybierz metodę zamówienia'],
    },
    billOption: {
      type: String,
      enum: ['classic', 'email'],
      default: 'classic',
    },
    orderPriority: {
      type: String,
      enum: ['asap', 'on-time'],
      default: 'asap',
    },
    paymentMethod: {
      type: String,
      enum: ['gotówka', 'online', 'card'],
    },
    tableNumber: Number,
    orderOnDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (val) {
          if (val) {
            const date = new Date(Date.now() + 2 * 60 * 60 * 1000);
            return val > date;
          }
          return true;
        },
        message: (props) =>
          `${new Date(props.value).toLocaleString()} musi być datą co najmniej 2h od daty aktualnej`,
      },
    },
    orderComment: String,
    isPaid: Boolean,
    checkoutId: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

orderSchema.virtual('totalPrice').get(function () {
  const totalPrice = this.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  if (!totalPrice) return undefined;

  return totalPrice.toFixed(2);
});

orderSchema.pre('find', function (next) {
  this.populate({
    path: 'products.product',
    select: '-__v',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
