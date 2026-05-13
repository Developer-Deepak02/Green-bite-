const express = require("express");

const router = express.Router();

const {
	createReview,
	getReviewsByMenuItem,
	updateReview,
	deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// ================= PUBLIC =================

// Get reviews for menu item
router.get("/menu/:menuItemId", getReviewsByMenuItem);

// ================= USER =================

// Create review
router.post("/", protect, createReview);

// Update review
router.put("/:id", protect, updateReview);

// Delete review
router.delete("/:id", protect, deleteReview);

module.exports = router;
