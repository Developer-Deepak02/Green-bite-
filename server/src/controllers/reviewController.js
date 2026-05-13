const Review = require("../models/Review");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

// ================= UPDATE MENU ITEM RATINGS =================
const updateMenuItemRatings = async (menuItemId) => {
	try {
		const reviews = await Review.find({ menuItem: menuItemId });

		const ratingCount = reviews.length;

		const ratingAverage =
			ratingCount === 0
				? 0
				: reviews.reduce((acc, item) => acc + item.rating, 0) /
				  ratingCount;

		await MenuItem.findByIdAndUpdate(menuItemId, {
			ratingAverage: Number(ratingAverage.toFixed(1)),
			ratingCount,
		});
	} catch (error) {
		console.error(error);
	}
};

// ================= CREATE REVIEW =================
exports.createReview = async (req, res) => {
	try {
		const { menuItem, rating, comment } = req.body;

		// Validation
		if (!menuItem || !rating) {
			return res.status(400).json({
				message: "Menu item and rating are required",
			});
		}

		// Check menu item exists
		const itemExists = await MenuItem.findById(menuItem);

		if (!itemExists) {
			return res.status(404).json({
				message: "Menu item not found",
			});
		}

		// Create review
		const review = await Review.create({
			user: req.user.id,
			menuItem,
			rating,
			comment,
		});

		// Update averages
		await updateMenuItemRatings(menuItem);

		res.status(201).json(review);
	} catch (error) {
		// Duplicate review protection
		if (error.code === 11000) {
			return res.status(400).json({
				message: "You already reviewed this item",
			});
		}

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= GET ITEM REVIEWS =================
exports.getReviewsByMenuItem = async (req, res) => {
	try {
		const reviews = await Review.find({
			menuItem: req.params.menuItemId,
		})
			.populate("user", "name")
			.sort({ createdAt: -1 });

		res.json(reviews);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= UPDATE REVIEW =================
exports.updateReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;

		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
			});
		}

		// Owner only
		if (review.user.toString() !== req.user.id) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		// Update fields
		if (rating !== undefined) {
			review.rating = rating;
		}

		if (comment !== undefined) {
			review.comment = comment;
		}

		await review.save();

		// Recalculate ratings
		await updateMenuItemRatings(review.menuItem);

		res.json(review);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= DELETE REVIEW =================
exports.deleteReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
			});
		}

		// Owner only
		if (review.user.toString() !== req.user.id) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		const menuItemId = review.menuItem;

		await review.deleteOne();

		// Recalculate ratings
		await updateMenuItemRatings(menuItemId);

		res.json({
			message: "Review deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};


// ================= GET ITEM REVIEWS =================
exports.getReviewsByMenuItem = async (req, res) => {
	try {
		const reviews = await Review.find({
			menuItem: req.params.menuItemId,
		})
			.populate("user", "name")
			.sort({ createdAt: -1 });

		res.json(reviews);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= UPDATE REVIEW =================
exports.updateReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;

		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
			});
		}

		// Owner only
		if (review.user.toString() !== req.user.id) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		// Update fields
		if (rating !== undefined) {
			review.rating = rating;
		}

		if (comment !== undefined) {
			review.comment = comment;
		}

		await review.save();

		// Recalculate ratings
		await updateMenuItemRatings(review.menuItem);

		res.json(review);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= DELETE REVIEW =================
exports.deleteReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({
				message: "Review not found",
			});
		}

		// Owner only
		if (review.user.toString() !== req.user.id) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		const menuItemId = review.menuItem;

		await review.deleteOne();

		// Recalculate ratings
		await updateMenuItemRatings(menuItemId);

		res.json({
			message: "Review deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
