const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
	try {
		const { items, totalAmount } = req.body;

		const order = await Order.create({
			user: req.user.id,
			items,
			totalAmount,
			estimatedDeliveryTime: 30,
		});

		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
