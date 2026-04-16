const Order = require("../models/Order");
const Address = require("../models/Address");

//  Create Order
exports.createOrder = async (req, res) => {
	try {
		const { items, totalAmount, address: addressId } = req.body;

		if (!items || items.length === 0) {
			return res.status(400).json({ message: "Cart is empty" });
		}

		if (!addressId) {
			return res.status(400).json({ message: "Address is required" });
		}
		// fetch address
		const addressDoc = await Address.findOne({
			_id: addressId,
			user: req.user.id,
		});

		if (!addressDoc) {
			return res.status(404).json({
				message: "Address not found",
			});
		}

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
			items,
			totalAmount,
			address: addressSnapshot,
			estimatedDeliveryTime: 30,
		});

		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user.id }).sort({
			createdAt: -1,
		});

		res.json({ orders });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// ================= ADMIN =================

// Get ALL orders (admin)
exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "name email") // optional
			.sort({ createdAt: -1 });

		res.json({ orders });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update order status (admin)
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

		order.status = status;
		await order.save();

		res.json({
			message: "Order status updated",
			order,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
