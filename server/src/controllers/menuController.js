const MenuItem = require("../models/MenuItem");

// ================= CREATE =================
// CREATE MENU ITEM (Admin)
exports.createMenuItem = async (req, res) => {
	try {
		const { name, description, price, category, image, preparationTime } =
			req.body;

		// Basic validation
		if (!name || !price || !category) {
			return res.status(400).json({
				message: "Name, price and category are required",
			});
		}

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

// ================= READ =================
// GET ALL MENU ITEMS (Public)
exports.getMenuItems = async (req, res) => {
	try {
		const { category, search } = req.query;

		let query = { isAvailable: true };

		// Filter by category
		if (category) {
			query.category = category;
		}

		// Search by name (safe regex)
		if (search) {
			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			query.name = { $regex: escaped, $options: "i" };
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

// ================= UPDATE =================
// UPDATE MENU ITEM (Admin)
exports.updateMenuItem = async (req, res) => {
	try {
		const allowedFields = [
			"name",
			"description",
			"price",
			"category",
			"image",
			"preparationTime",
		];

		const updateData = {};

		allowedFields.forEach((field) => {
			if (req.body[field] !== undefined) {
				updateData[field] = req.body[field];
			}
		});

		const item = await MenuItem.findByIdAndUpdate(req.params.id, updateData, {
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

// ================= DELETE =================
// DELETE MENU ITEM (Admin)
exports.deleteMenuItem = async (req, res) => {
	try {
		const item = await MenuItem.findByIdAndDelete(req.params.id);

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json({ message: "Item deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// ================= TOGGLE =================
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
