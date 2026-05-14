const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

// ================= CREATE RAZORPAY ORDER =================
exports.createRazorpayOrder = async (req, res) => {
	try {
		const { orderId } = req.body;

		if (!orderId) {
			return res.status(400).json({
				message: "Order ID is required",
			});
		}

		// Find order
		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		// Only Razorpay payments allowed
		if (order.paymentMethod !== "razorpay") {
			return res.status(400).json({
				message: "This order uses Cash on Delivery",
			});
		}

		// Security check
		if (order.user.toString() !== req.user.id) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		// Prevent duplicate payment
		if (order.isPaid) {
			return res.status(400).json({
				message: "Order already paid",
			});
		}

		// Prevent duplicate Razorpay order creation
		if (order.razorpayOrderId) {
			return res.status(400).json({
				message: "Razorpay order already created",
			});
		}

		// Razorpay options
		const options = {
			amount: Math.round(order.totalAmount * 100),
			currency: "INR",
			receipt: `receipt_${order._id}`,
		};

		// Create Razorpay order
		const razorpayOrder = await razorpay.orders.create(options);

		// Save Razorpay order ID
		order.razorpayOrderId = razorpayOrder.id;

		await order.save();

		res.json({
			message: "Razorpay order created",

			razorpayOrderId: razorpayOrder.id,

			amount: razorpayOrder.amount,

			currency: razorpayOrder.currency,

			key: process.env.RAZORPAY_KEY_ID,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
	try {
		const {
			orderId,
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
		} = req.body;

		// Find order
		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		// Prevent duplicate verification
		if (order.isPaid) {
			return res.status(400).json({
				message: "Order already paid",
			});
		}

		// Generate signature
		const body = razorpay_order_id + "|" + razorpay_payment_id;

		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(body.toString())
			.digest("hex");

		// Verify signature
		if (expectedSignature !== razorpay_signature) {
			order.paymentStatus = "failed";

			await order.save();

			return res.status(400).json({
				message: "Invalid payment signature",
			});
		}

		// Mark paid
		order.isPaid = true;

		order.paidAt = new Date();

		order.paymentStatus = "paid";

		order.status = "confirmed";

		order.razorpayOrderId = razorpay_order_id;

		order.razorpayPaymentId = razorpay_payment_id;

		await order.save();

		res.json({
			message: "Payment verified successfully",
			order,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= PAYMENT FAILED =================
exports.paymentFailed = async (req, res) => {
	try {
		const { orderId } = req.body;

		if (!orderId) {
			return res.status(400).json({
				message: "Order ID is required",
			});
		}

		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		order.paymentStatus = "failed";

		await order.save();

		res.json({
			message: "Payment marked as failed",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
