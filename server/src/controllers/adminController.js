const Order = require("../models/Order");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

// ================= DASHBOARD STATS =================
exports.getDashboardStats = async (req, res) => {
	try {
		// ================= BASIC COUNTS =================

		const totalOrders = await Order.countDocuments();

		const totalUsers = await User.countDocuments({
			role: "user",
		});

		const totalMenuItems = await MenuItem.countDocuments();

		// ================= ORDER STATUS COUNTS =================

		const pendingOrders = await Order.countDocuments({
			status: "pending",
		});

		const confirmedOrders = await Order.countDocuments({
			status: "confirmed",
		});

		const preparingOrders = await Order.countDocuments({
			status: "preparing",
		});

		const outForDeliveryOrders = await Order.countDocuments({
			status: "out_for_delivery",
		});

		const deliveredOrders = await Order.countDocuments({
			status: "delivered",
		});

		const cancelledOrders = await Order.countDocuments({
			status: "cancelled",
		});

		// ================= TOTAL REVENUE =================

		const revenueResult = await Order.aggregate([
			{
				$match: {
					status: {
						$ne: "cancelled",
					},
				},
			},
			{
				$group: {
					_id: null,
					totalRevenue: {
						$sum: "$totalAmount",
					},
				},
			},
		]);

		const totalRevenue =
			revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

		// ================= PAYMENT ANALYTICS =================

		const codRevenueResult = await Order.aggregate([
			{
				$match: {
					paymentMethod: "cod",
					paymentStatus: "paid",
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: "$totalAmount",
					},
				},
			},
		]);

		const razorpayRevenueResult = await Order.aggregate([
			{
				$match: {
					paymentMethod: "razorpay",
					paymentStatus: "paid",
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: "$totalAmount",
					},
				},
			},
		]);

		const codRevenue =
			codRevenueResult.length > 0 ? codRevenueResult[0].total : 0;

		const razorpayRevenue =
			razorpayRevenueResult.length > 0 ? razorpayRevenueResult[0].total : 0;

		// ================= TOP SELLING ITEMS =================

		const topSellingItems = await Order.aggregate([
			{
				$unwind: "$items",
			},
			{
				$group: {
					_id: "$items.name",

					totalSold: {
						$sum: "$items.quantity",
					},

					totalRevenue: {
						$sum: {
							$multiply: ["$items.price", "$items.quantity"],
						},
					},
				},
			},
			{
				$sort: {
					totalSold: -1,
				},
			},
			{
				$limit: 5,
			},
		]);

		// ================= MONTHLY REVENUE =================

		const monthlyRevenue = await Order.aggregate([
			{
				$match: {
					status: {
						$ne: "cancelled",
					},
				},
			},
			{
				$group: {
					_id: {
						year: {
							$year: "$createdAt",
						},

						month: {
							$month: "$createdAt",
						},
					},

					totalRevenue: {
						$sum: "$totalAmount",
					},

					totalOrders: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					"_id.year": 1,
					"_id.month": 1,
				},
			},
		]);

		// ================= RECENT ORDERS =================

		const recentOrders = await Order.find()
			.populate("user", "name email")
			.sort({ createdAt: -1 })
			.limit(5);

		// ================= RESPONSE =================

		res.json({
			overview: {
				totalOrders,
				totalUsers,
				totalMenuItems,
				totalRevenue,
			},

			orderStats: {
				pendingOrders,
				confirmedOrders,
				preparingOrders,
				outForDeliveryOrders,
				deliveredOrders,
				cancelledOrders,
			},

			paymentAnalytics: {
				codRevenue,
				razorpayRevenue,
			},

			topSellingItems,

			monthlyRevenue,

			recentOrders,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= GET ALL ORDERS =================

exports.getAllOrders = async (req, res) => {
	try {
		const { status } = req.query;

		const query = {};

		if (status) {
			query.status = status;
		}

		const orders = await Order.find(query)
			.populate("user", "name email")
			.sort({ createdAt: -1 });

		res.json({
			count: orders.length,
			orders,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= UPDATE ORDER STATUS =================

exports.updateOrderStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const allowedStatuses = [
			"pending",
			"confirmed",
			"preparing",
			"out_for_delivery",
			"delivered",
			"cancelled",
		];

		if (!allowedStatuses.includes(status)) {
			return res.status(400).json({
				message: "Invalid order status",
			});
		}

		const order = await Order.findById(req.params.id);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		order.status = status;

		order.statusHistory.push({
			status,
			updatedAt: new Date(),
		});

		if (status === "delivered" && order.paymentMethod === "cod") {
			order.isPaid = true;

			order.paymentStatus = "paid";

			order.paidAt = new Date();
		}

		await order.save();

		const updatedOrder = await Order.findById(order._id).populate(
			"user",
			"name email",
		);

		res.json({
			message: "Order status updated",
			order: updatedOrder,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
