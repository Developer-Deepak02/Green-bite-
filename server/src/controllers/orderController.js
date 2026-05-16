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

		// Validate cart
		if (!items || items.length === 0) {
			return res.status(400).json({
				message: "Cart is empty",
			});
		}

		// Validate address
		if (!addressId) {
			return res.status(400).json({
				message: "Address is required",
			});
		}

		// Validate payment method
		const validPaymentMethods = ["cod", "razorpay"];

		if (!validPaymentMethods.includes(paymentMethod)) {
			return res.status(400).json({
				message: "Invalid payment method",
			});
		}

		// Get address
		const addressDoc = await Address.findOne({
			_id: addressId,
			user: req.user.id,
		});

		if (!addressDoc) {
			return res.status(404).json({
				message: "Address not found",
			});
		}

		// ================= BUILD SECURE ORDER ITEMS =================

		let secureItems = [];
		let subtotalAmount = 0;
		let estimatedDeliveryTime = 0;

		for (const item of items) {
			// Fetch real menu item
			const menuItem = await MenuItem.findById(item.menuItemId);

			if (!menuItem) {
				return res.status(404).json({
					message: "Menu item not found",
				});
			}

			// Availability check
			if (!menuItem.isAvailable) {
				return res.status(400).json({
					message: `${menuItem.name} is unavailable`,
				});
			}

			const quantity = Number(item.quantity);

			// Item total
			const itemTotal = menuItem.price * quantity;

			subtotalAmount += itemTotal;

			// Delivery estimation
			estimatedDeliveryTime += menuItem.preparationTime * quantity;

			// Secure item snapshot
			secureItems.push({
				menuItemId: menuItem._id,
				name: menuItem.name,
				price: menuItem.price,
				quantity,
			});
		}

		// Minimum fallback
		if (estimatedDeliveryTime < 20) {
			estimatedDeliveryTime = 20;
		}

		// ================= COUPON LOGIC =================

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

			// Expiry check
			if (new Date() > coupon.expiryDate) {
				return res.status(400).json({
					message: "Coupon expired",
				});
			}

			// Usage limit
			if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
				return res.status(400).json({
					message: "Coupon usage limit reached",
				});
			}

			// Minimum order amount
			if (subtotalAmount < coupon.minimumOrderAmount) {
				return res.status(400).json({
					message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
				});
			}

			// Calculate discount
			if (coupon.discountType === "percentage") {
				discountAmount = (subtotalAmount * coupon.discountValue) / 100;
			} else {
				discountAmount = coupon.discountValue;
			}

			// Prevent negative totals
			if (discountAmount > subtotalAmount) {
				discountAmount = subtotalAmount;
			}

			// Increment usage count
			coupon.usedCount += 1;

			await coupon.save();
		}

		// ================= FINAL TOTAL =================

		const totalAmount = subtotalAmount - discountAmount;

		// ================= ADDRESS SNAPSHOT =================

		const addressSnapshot = {
			fullName: addressDoc.fullName,
			phone: addressDoc.phone,
			street: addressDoc.street,
			city: addressDoc.city,
			state: addressDoc.state,
			pincode: addressDoc.pincode,
		};

		// ================= CREATE ORDER =================

		const order = await Order.create({
			user: req.user.id,
			items: secureItems,
			subtotalAmount,
			discountAmount,
			coupon: coupon ? coupon._id : null,
			totalAmount,
			address: addressSnapshot,
			paymentMethod,
			statusHistory: [
				{
					status: "pending",
				},
			],
			estimatedDeliveryTime,

			// COD orders stay pending until payment/delivery
			isPaid: false,
			paymentStatus: "pending",
		});

		// ================= SEND ORDER EMAIL =================

		const user = await User.findById(req.user.id);

		await sendEmail({
			to: user.email,
			subject: "Order Confirmation - Greenbite",
			html: orderConfirmationTemplate({
				name: user.name,
				order,
			}),
		});

		// ================= RESPONSE =================

		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= USER =================

// Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({
			user: req.user.id,
		}).sort({
			createdAt: -1,
		});

		res.json({ orders });
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= GET SINGLE ORDER =================
exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			"coupon",
			"code discountType discountValue",
		);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		// Owner or admin only
		if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		res.json(order);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADMIN =================

// Get ALL orders (admin)
exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.sort({ createdAt: -1 });

		res.json({ orders });
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

		// Prevent updates after delivery
		if (order.status === "delivered") {
			return res.status(400).json({
				message: "Delivered orders cannot be updated",
			});
		}

		// Prevent updates after cancellation
		if (order.status === "cancelled") {
			return res.status(400).json({
				message: "Cancelled orders cannot be updated",
			});
		}

		// Prevent same status update
		if (order.status === status) {
			return res.status(400).json({
				message: "Order already has this status",
			});
		}

		// Update status
		order.status = status;

		// Save timeline history
		order.statusHistory.push({
			status,
			updatedAt: new Date(),
		});

		// Auto payment update for COD
		if (status === "delivered" && order.paymentMethod === "cod") {
			order.isPaid = true;
			order.paymentStatus = "paid";
			order.paidAt = new Date();
		}

		// ================= DELIVERY EMAIL =================

		if (status === "delivered") {
			const user = await User.findById(order.user);

			await sendEmail({
				to: user.email,
				subject: "Your Greenbite Order Was Delivered 🎉",
				html: orderDeliveredTemplate({
					name: user.name,
					order,
				}),
			});
		}

		await order.save();

		res.json({
			message: "Order status updated",
			order,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
