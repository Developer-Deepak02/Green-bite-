const Order = require("../models/Order");
const Address = require("../models/Address");
const MenuItem = require("../models/MenuItem");
const Coupon = require("../models/Coupon");
const User = require("../models/User");

const sendEmail = require("../emails/sendEmail");

const orderConfirmationTemplate = require("../emails/templates/orderConfirmationTemplate");

const orderDeliveredTemplate = require("../emails/templates/orderDeliveredTemplate");

// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
	try {
		const {
			items,
			address: addressId,
			couponCode,
			paymentMethod = "cod",
		} = req.body;

		if (!items || items.length === 0) {
			return res.status(400).json({
				message: "Cart is empty",
			});
		}

		if (!addressId) {
			return res.status(400).json({
				message: "Address is required",
			});
		}

		const validPaymentMethods = ["cod", "razorpay"];

		if (!validPaymentMethods.includes(paymentMethod)) {
			return res.status(400).json({
				message: "Invalid payment method",
			});
		}

		const addressDoc = await Address.findOne({
			_id: addressId,
			user: req.user.id,
		});

		if (!addressDoc) {
			return res.status(404).json({
				message: "Address not found",
			});
		}

		let secureItems = [];

		let subtotalAmount = 0;

		let estimatedDeliveryTime = 0;

		for (const item of items) {
			const menuItem = await MenuItem.findById(item.menuItemId);

			if (!menuItem) {
				return res.status(404).json({
					message: "Menu item not found",
				});
			}

			if (!menuItem.isAvailable) {
				return res.status(400).json({
					message: `${menuItem.name} is unavailable`,
				});
			}

			const quantity = Number(item.quantity);

			const itemTotal = menuItem.price * quantity;

			subtotalAmount += itemTotal;

			estimatedDeliveryTime += menuItem.preparationTime * quantity;

			secureItems.push({
				menuItemId: menuItem._id,
				name: menuItem.name,
				price: menuItem.price,
				quantity,
			});
		}

		if (estimatedDeliveryTime < 20) {
			estimatedDeliveryTime = 20;
		}

		let coupon = null;

		let discountAmount = 0;

		if (couponCode) {
			coupon = await Coupon.findOne({
				code: couponCode.toUpperCase(),
				isActive: true,
			});

			if (!coupon) {
				return res.status(400).json({
					message: "Invalid coupon",
				});
			}

			if (new Date() > coupon.expiryDate) {
				return res.status(400).json({
					message: "Coupon expired",
				});
			}

			if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
				return res.status(400).json({
					message: "Coupon usage limit reached",
				});
			}

			if (subtotalAmount < coupon.minimumOrderAmount) {
				return res.status(400).json({
					message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
				});
			}

			if (coupon.discountType === "percentage") {
				discountAmount = (subtotalAmount * coupon.discountValue) / 100;
			} else {
				discountAmount = coupon.discountValue;
			}

			if (discountAmount > subtotalAmount) {
				discountAmount = subtotalAmount;
			}

			coupon.usedCount += 1;

			await coupon.save();
		}

		const totalAmount = subtotalAmount - discountAmount;

		const addressSnapshot = {
			fullName: addressDoc.fullName,
			phone: addressDoc.phone,
			street: addressDoc.street,
			city: addressDoc.city,
			state: addressDoc.state,
			pincode: addressDoc.pincode,
		};

		const order = await Order.create({
			user: req.user.id,
			items: secureItems,
			subtotalAmount,
			discountAmount,
			coupon: coupon ? coupon._id : null,
			totalAmount,
			address: addressSnapshot,
			paymentMethod,
			status: paymentMethod === "cod" ? "confirmed" : "pending",
			statusHistory: [
				{
					status: paymentMethod === "cod" ? "confirmed" : "pending",
					updatedAt: new Date(),
				},
			],
			estimatedDeliveryTime,
			isPaid: false,
			paymentStatus: "pending",
		});

		const user = await User.findById(req.user.id);

		await sendEmail({
			to: user.email,
			subject: "Order Confirmation - BiteRush",
			html: orderConfirmationTemplate({
				name: user.name,
				order,
			}),
		});

		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= USER ORDERS =================
exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({
			user: req.user.id,
		})
			.sort({
				createdAt: -1,
			})
			.populate("coupon", "code discountType discountValue");

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

// ================= GET SINGLE ORDER =================
exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("coupon", "code discountType discountValue")
			.populate("user", "name email");

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		if (
			order.user._id.toString() !== req.user.id &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		res.json({
			order,
			tracking: {
				currentStep: order.currentStep,
				totalSteps: order.totalSteps,
				progressPercentage: order.progressPercentage,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADMIN GET ALL ORDERS =================
exports.getAllOrders = async (req, res) => {
	try {
		const { status } = req.query;

		const query = {};

		if (status && status !== "all") {
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
		const { status } = req.body || {};

		if (!status) {
			return res.status(400).json({
				message: "Status is required",
			});
		}

		const validStatuses = [
			"pending",
			"confirmed",
			"preparing",
			"out_for_delivery",
			"delivered",
			"cancelled",
		];

		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				message: "Invalid status value",
			});
		}

		const order = await Order.findById(req.params.id);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		if (order.status === "delivered") {
			return res.status(400).json({
				message: "Delivered orders cannot be updated",
			});
		}

		if (order.status === "cancelled") {
			return res.status(400).json({
				message: "Cancelled orders cannot be updated",
			});
		}

		if (order.status === status) {
			return res.status(400).json({
				message: "Order already has this status",
			});
		}

		order.status = status;

		order.statusHistory.push({
			status,
			updatedAt: new Date(),
		});

		if (status === "delivered") {
			order.isPaid = true;

			order.paymentStatus = "paid";

			order.paidAt = new Date();
		}

		if (status === "cancelled") {
			order.paymentStatus = "failed";
		}

		if (status === "delivered") {
			const user = await User.findById(order.user);

			await sendEmail({
				to: user.email,
				subject: "Your BiteRush Order Was Delivered 🎉",
				html: orderDeliveredTemplate({
					name: user.name,
					order,
				}),
			});
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
