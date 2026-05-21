const Review = require("../models/Review");

// ================= GET ALL REVIEWS =================

exports.getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find()
			.populate("user", "name email")
			.populate("menuItem", "name image price")
			.sort({ createdAt: -1 });

		res.json({
			count: reviews.length,
			reviews,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADMIN DELETE REVIEW =================

exports.adminDeleteReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
			});
		}

		await review.deleteOne();

		res.json({
			message: "Review deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
