const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

// ================= GET CART =================
exports.getCart = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate({
			path: "cart.menuItem",
			select:
				"name price image category isAvailable preparationTime ratingAverage",
		});

		let subtotal = 0;

		const cartItems = user.cart.map((item) => {
			const itemTotal = item.menuItem.price * item.quantity;

			subtotal += itemTotal;

			return {
				menuItem: item.menuItem,
				quantity: item.quantity,
				itemTotal,
			};
		});

		res.json({
			items: cartItems,
			subtotal,
			totalItems: cartItems.length,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADD TO CART =================
exports.addToCart = async (req, res) => {
	try {
		const { quantity = 1 } = req.body;

		const { menuItemId } = req.params;

		const menuItem = await MenuItem.findById(menuItemId);

		if (!menuItem) {
			return res.status(404).json({
				message: "Menu item not found",
			});
		}

		if (!menuItem.isAvailable) {
			return res.status(400).json({
				message: "Item is unavailable",
			});
		}

		const user = await User.findById(req.user.id);

		const existingItem = user.cart.find(
			(item) => item.menuItem.toString() === menuItemId,
		);

		if (existingItem) {
			existingItem.quantity += Number(quantity);
		} else {
			user.cart.push({
				menuItem: menuItemId,
				quantity: Number(quantity),
			});
		}

		await user.save();

		res.json({
			message: "Item added to cart",
			cart: user.cart,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= UPDATE CART ITEM =================
exports.updateCartItem = async (req, res) => {
	try {
		const { quantity } = req.body;

		// Validate quantity
		if (!quantity || quantity < 1) {
			return res.status(400).json({
				message: "Quantity must be at least 1",
			});
		}

		const user = await User.findById(req.user.id);

		// Find cart item
		const cartItem = user.cart.find(
			(item) => item.menuItem.toString() === req.params.menuItemId,
		);

		if (!cartItem) {
			return res.status(404).json({
				message: "Item not found in cart",
			});
		}

		// SET quantity instead of ADDING
		cartItem.quantity = quantity;

		await user.save();

		res.json({
			message: "Cart updated",
			cart: user.cart,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= REMOVE FROM CART =================
exports.removeFromCart = async (req, res) => {
	try {
		const { menuItemId } = req.params;

		const user = await User.findById(req.user.id);

		user.cart = user.cart.filter(
			(item) => item.menuItem.toString() !== menuItemId,
		);

		await user.save();

		res.json({
			message: "Item removed from cart",
			cart: user.cart,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= CLEAR CART =================
exports.clearCart = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		user.cart = [];

		await user.save();

		res.json({
			message: "Cart cleared",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
