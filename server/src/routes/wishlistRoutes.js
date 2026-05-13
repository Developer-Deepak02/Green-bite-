const express = require("express");
const router = express.Router();

const {
	getWishlist,
	addToWishlist,
	removeFromWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// ================= WISHLIST =================
router.get("/", protect, getWishlist);

router.post("/:menuItemId", protect, addToWishlist);

router.delete("/:menuItemId", protect, removeFromWishlist);

module.exports = router;
