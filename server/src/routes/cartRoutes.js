const express = require("express");

const router = express.Router();

const {
	getCart,
	addToCart,
	updateCartItem,
	removeFromCart,
	clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// ================= CART =================

// Get cart
router.get("/", protect, getCart);

// Add item to cart
router.post("/:menuItemId", protect, addToCart);

// Update quantity
router.put("/:menuItemId", protect, updateCartItem);

// Remove item
router.delete("/:menuItemId", protect, removeFromCart);

// Clear cart
router.delete("/", protect, clearCart);

module.exports = router;
