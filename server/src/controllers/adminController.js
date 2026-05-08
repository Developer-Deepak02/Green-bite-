const Order = require("../models/Order");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
	try {
		// Total orders
		const totalOrders = await Order.countDocuments();

		// Total revenue
		const revenueResult = await Order.aggregate([
			{
				$match: {
					status: { $ne: "cancelled" },
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$totalAmount" },
				},
			},
		]);

		const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

		// Order stats
		const pendingOrders = await Order.countDocuments({
			status: "pending",
		});

		const deliveredOrders = await Order.countDocuments({
			status: "delivered",
		});

		const cancelledOrders = await Order.countDocuments({
			status: "cancelled",
		});

		// Total users
		const totalUsers = await User.countDocuments({
			role: "user",
		});

		// Recent orders
		const recentOrders = await Order.find()
			.populate("user", "name email")
			.sort({ createdAt: -1 })
			.limit(5);

		res.json({
			totalOrders,
			totalRevenue,
			pendingOrders,
			deliveredOrders,
			cancelledOrders,
			totalUsers,
			recentOrders,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
