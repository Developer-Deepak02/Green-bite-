const MenuItem = require("../models/MenuItem");

// CREATE MENU ITEM (Admin)
exports.createMenuItem = async (req, res) => {
	try {
		const { name, description, price, category, image, preparationTime } =
			req.body;

		const item = await MenuItem.create({
			name,
			description,
			price,
			category,
			image,
			preparationTime,
		});

		res.status(201).json(item);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// GET ALL MENU ITEMS (Public with filters)
exports.getMenuItems = async (req, res) => {
	try {
		const { category, search } = req.query;

		let query = { isAvailable: true };

		// Filter by category
		if (category) {
			query.category = category;
		}

		// Search by name
		if (search) {
			query.name = { $regex: search, $options: "i" };
		}

		const items = await MenuItem.find(query)
			.populate("category", "name")
			.sort({ createdAt: -1 });

		res.json(items);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// GET SINGLE ITEM
exports.getMenuItemById = async (req, res) => {
	try {
		const item = await MenuItem.findById(req.params.id).populate(
			"category",
			"name",
		);

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json(item);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// UPDATE MENU ITEM (Admin)
exports.updateMenuItem = async (req, res) => {
	try {
		const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json(item);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// TOGGLE AVAILABILITY (Admin)
exports.toggleAvailability = async (req, res) => {
	try {
		const item = await MenuItem.findById(req.params.id);

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		item.isAvailable = !item.isAvailable;
		await item.save();

		res.json({
			message: "Availability updated",
			isAvailable: item.isAvailable,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
