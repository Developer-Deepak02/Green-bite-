const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

// ================= GET WISHLIST =================
exports.getWishlist = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate({
			path: "wishlist",
			populate: {
				path: "category",
				select: "name",
			},
		});

		res.json(user.wishlist);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADD TO WISHLIST =================
exports.addToWishlist = async (req, res) => {
	try {
		const { menuItemId } = req.params;

		// Check item exists
		const item = await MenuItem.findById(menuItemId);

		if (!item) {
			return res.status(404).json({
				message: "Menu item not found",
			});
		}

		const user = await User.findById(req.user.id);

		// Prevent duplicates
		if (user.wishlist.includes(menuItemId)) {
			return res.status(400).json({
				message: "Item already in wishlist",
			});
		}

		user.wishlist.push(menuItemId);

		await user.save();

		res.json({
			message: "Added to wishlist",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= REMOVE FROM WISHLIST =================
exports.removeFromWishlist = async (req, res) => {
	try {
		const { menuItemId } = req.params;

		const user = await User.findById(req.user.id);

		user.wishlist = user.wishlist.filter(
			(item) => item.toString() !== menuItemId,
		);

		await user.save();

		res.json({
			message: "Removed from wishlist",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
  