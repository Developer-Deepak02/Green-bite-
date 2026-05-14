const express = require("express");

const router = express.Router();

const {
	createReview,
	getReviewsByMenuItem,
	getMyReviews,
	updateReview,
	deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// ================= PUBLIC =================

// Get reviews for a menu item
router.get("/menu/:menuItemId", getReviewsByMenuItem);

// ================= USER =================

// Get logged-in user's reviews
router.get("/my", protect, getMyReviews);

// Create review
router.post("/", protect, createReview);

// Update review
router.put("/:id", protect, updateReview);

// Delete review
router.delete("/:id", protect, deleteReview);

module.exports = router;
