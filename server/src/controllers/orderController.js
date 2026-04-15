const Order = require("../models/Order");
const Address = require("../models/Address");

//  Create Order
exports.createOrder = async (req, res) => {
	try {
		const { items, totalAmount, address: addressId } = req.body;

		// Basic validation
		if (!items || items.length === 0) {
			return res.status(400).json({ message: "Cart is empty" });
		}

		if (!addressId) {
			return res.status(400).json({ message: "Address is required" });
		}

		// Fetch address
		const addressDoc = await Address.findOne({
			_id: addressId,
			user: req.user.id,
		});

		if (!addressDoc) {
			return res.status(404).json({
				message: "Address not found",
			});
		}

		// Convert to snapshot
		const addressSnapshot = {
			fullName: addressDoc.fullName,
			phone: addressDoc.phone,
			street: addressDoc.street,
			city: addressDoc.city,
			state: addressDoc.state,
			pincode: addressDoc.pincode,
		};

		// Create order
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

		res.json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
