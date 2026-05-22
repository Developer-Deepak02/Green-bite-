const Order = require("../models/Order");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

// ================= DASHBOARD STATS =================
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

		// ================= DATE HELPERS =================

		const today = new Date();

		const currentWeekStart = new Date();
		currentWeekStart.setDate(today.getDate() - 6);
		currentWeekStart.setHours(0, 0, 0, 0);

		const previousWeekStart = new Date();
		previousWeekStart.setDate(currentWeekStart.getDate() - 7);

		const previousWeekEnd = new Date();
		previousWeekEnd.setDate(currentWeekStart.getDate() - 1);
		previousWeekEnd.setHours(23, 59, 59, 999);

		// ================= CURRENT WEEK =================

		const currentWeekOrders = await Order.find({
			createdAt: {
				$gte: currentWeekStart,
			},
			status: {
				$ne: "cancelled",
			},
		});

		// ================= PREVIOUS WEEK =================

		const previousWeekOrders = await Order.find({
			createdAt: {
				$gte: previousWeekStart,
				$lte: previousWeekEnd,
			},
			status: {
				$ne: "cancelled",
			},
		});

		// ================= WEEK REVENUE =================

		const currentWeekRevenue = currentWeekOrders.reduce(
			(sum, order) => sum + order.totalAmount,
			0,
		);

		const previousWeekRevenue = previousWeekOrders.reduce(
			(sum, order) => sum + order.totalAmount,
			0,
		);

		// ================= GROWTH CALCULATIONS =================

		const revenueGrowth =
			previousWeekRevenue === 0
				? 100
				: (
						((currentWeekRevenue - previousWeekRevenue) /
							previousWeekRevenue) *
						100
					).toFixed(1);

		const orderGrowth =
			previousWeekOrders.length === 0
				? 100
				: (
						((currentWeekOrders.length - previousWeekOrders.length) /
							previousWeekOrders.length) *
						100
					).toFixed(1);

		// ================= WEEKLY ANALYTICS =================

		const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

		const revenueAnalytics = [];
		const ordersAnalytics = [];

		for (let i = 0; i < 7; i++) {
			const dayStart = new Date(currentWeekStart);

			dayStart.setDate(currentWeekStart.getDate() + i);

			dayStart.setHours(0, 0, 0, 0);

			const dayEnd = new Date(dayStart);

			dayEnd.setHours(23, 59, 59, 999);

			const dayOrders = currentWeekOrders.filter((order) => {
				const orderDate = new Date(order.createdAt);

				return orderDate >= dayStart && orderDate <= dayEnd;
			});

			const revenue = dayOrders.reduce(
				(sum, order) => sum + order.totalAmount,
				0,
			);

			revenueAnalytics.push({
				name: weekDays[i],
				revenue,
			});

			ordersAnalytics.push({
				name: weekDays[i],
				orders: dayOrders.length,
			});
		}

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

			growthStats: {
				revenueGrowth,
				orderGrowth,
			},

			revenueAnalytics,

			ordersAnalytics,

			paymentAnalytics: {
				codRevenue,
				razorpayRevenue,
			},

			topSellingItems,

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
