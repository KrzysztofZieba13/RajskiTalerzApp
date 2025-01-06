const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/isLoggedIn', authController.isLoggedIn);
router.post('/logout', authController.logout);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

//ROUTES PROTECTED
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router
  .route('/favourites/:productId')
  .patch(userController.addToFavourites)
  .delete(userController.removeFromFavourites);

// ROUTES ONLY FOR ADMIN
router.use(authController.restrictTo('admin'));
router.post('/create-employee', userController.createEmployee);
router.get('/', userController.getAllUsers);
router.delete('/employee/:id', userController.deleteEmployee);

module.exports = router;
