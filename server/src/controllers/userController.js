const User = require("../models/User");
const Order = require("../models/Order");

// ================= GET ALL USERS =================

exports.getUsers = async (req, res) => {
	try {
		const { search = "", role = "all" } = req.query;

		const query = {};

		// SEARCH

		if (search) {
			query.$or = [
				{
					name: {
						$regex: search,
						$options: "i",
					},
				},
				{
					email: {
						$regex: search,
						$options: "i",
					},
				},
			];
		}

		// ROLE FILTER

		if (role !== "all") {
			query.role = role;
		}

		const users = await User.find(query)
			.select("-password")
			.sort({ createdAt: -1 });

		// ADD ORDER STATS

		const usersWithStats = await Promise.all(
			users.map(async (user) => {
				const orders = await Order.find({
					user: user._id,
				});

				const totalOrders = orders.length;

				const totalSpent = orders.reduce(
					(total, order) => total + order.totalAmount,
					0,
				);

				return {
					...user.toObject(),
					totalOrders,
					totalSpent,
				};
			}),
		);

		res.json({
			count: usersWithStats.length,
			users: usersWithStats,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= BLOCK USER =================

exports.toggleBlockUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		// Prevent self block

		if (user._id.toString() === req.user.id) {
			return res.status(400).json({
				message: "You cannot block yourself",
			});
		}

		user.isBlocked = !user.isBlocked;

		user.blockedAt = user.isBlocked ? new Date() : null;

		await user.save();

		res.json({
			message: user.isBlocked
				? "User blocked successfully"
				: "User unblocked successfully",
			user,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= CHANGE ROLE =================

exports.changeUserRole = async (req, res) => {
	try {
		const { role } = req.body;

		if (!["user", "admin"].includes(role)) {
			return res.status(400).json({
				message: "Invalid role",
			});
		}

		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		// Prevent self role change

		if (user._id.toString() === req.user.id) {
			return res.status(400).json({
				message: "You cannot change your own role",
			});
		}

		user.role = role;

		await user.save();

		res.json({
			message: `User role updated to ${role}`,
			user,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= DELETE USER =================

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		// Prevent self delete

		if (user._id.toString() === req.user.id) {
			return res.status(400).json({
				message: "You cannot delete yourself",
			});
		}

		await user.deleteOne();

		res.json({
			message: "User deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
