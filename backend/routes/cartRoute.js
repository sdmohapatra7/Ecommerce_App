const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeCartItem, clearCart } = require('../controllers/cartController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

// Add item to cart
router.put("/cart/add", isAuthenticatedUser, addToCart);

// Get cart items
router.get("/cart", isAuthenticatedUser, getCart);

// Remove item from cart
router.delete("/cart/remove/:productId", isAuthenticatedUser, removeCartItem);

// Clear cart
router.delete("/cart/clear", isAuthenticatedUser, clearCart);

module.exports = router;
