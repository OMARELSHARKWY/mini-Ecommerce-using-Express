const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router
  .route('/api/cart/:userId')
  .get(cartController.getUserCart)
  .delete(cartController.clearCart);

router
  .route('/api/cart/:userId/items')
  .post(cartController.addToCart);

router
  .route('/api/cart/:userId/items/:productId')
  .patch(cartController.updateCartItem)
  .delete(cartController.removeCartItem);

module.exports = router;
