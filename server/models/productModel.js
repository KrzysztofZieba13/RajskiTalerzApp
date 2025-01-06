const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Produkt musi mieć nazwę'],
    unique: true,
    trim: true,
    maxLength: [40, 'Nazwa produktu nie może przekraczać długości 40 znaków'],
  },
  price: {
    type: Number,
    required: [true, 'Produkt musi mieć cenę'],
  },
  ingredients: [String],
  category: {
    type: String,
    enum: [
      'pasta',
      'pizza',
      'croissaint',
      'salad',
      'burrito',
      'dinner',
      'breakfast',
      'drink',
    ],
  },
  image: {
    type: String,
    required: [true, 'Produkt musi mieć zdjęcie poglądowe'],
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
