const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;
const cartSchema = new Schema({
  userId: {
    type: Types.ObjectId,  // This should be mongoose.Types.ObjectId
    required: [true, "User ID is required"],
    ref: 'User' // Optional: if referencing a User model
  },
  items: [
    {
      productId: {
        type: Types.ObjectId,
        required: [true, "Product ID is required"],
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
      }
    }
  ]
});

const Cart = model('Cart', cartSchema);
module.exports = Cart;
