const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Użytkownik musi mieć imię'],
    maxlength: 50,
  },
  surname: {
    type: String,
    required: [true, 'Użytkownik musi mieć nazwisko'],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email jest wymagany'],
    lowercase: true,
    validate: [validator.isEmail, 'Wprowadź poprawny adres email'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['client', 'cook', 'deliveryGuy', 'waiter', 'admin'],
    default: 'client',
  },
  password: {
    type: String,
    required: [true, 'Proszę wprowadzić hasło'],
    minlength: [8, 'Hasło musi mieć minimum 8 znaków'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Proszę potwierdzić hasło'],
    validate: {
      validator: function (password) {
        return password === this.password;
      },
      message: 'Hasła są różne',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  favouriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password' || this.$isNew)) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//TODO: CHANGEDPASSWORDAFTER

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
