const express = require("express");

const router = express.Router();

const {
	getAllReviews,
	adminDeleteReview,
} = require("../controllers/adminReviewController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================= ADMIN REVIEWS =================

// Get all reviews
router.get("/", protect, adminOnly, getAllReviews);

// Delete review
router.delete("/:id", protect, adminOnly, adminDeleteReview);

module.exports = router;
