const Category = require("../models/Category");

// CREATE CATEGORY (Admin)
exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		const existing = await Category.findOne({ name });
		if (existing) {
			return res.status(400).json({ message: "Category already exists" });
		}

		const category = await Category.create({ name });

		res.status(201).json(category);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// GET ALL CATEGORIES (Public)
exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find({ isActive: true }).sort({
			createdAt: -1,
		});
		res.json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// UPDATE CATEGORY (Admin)
exports.updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, isActive } = req.body;

		const category = await Category.findByIdAndUpdate(
			id,
			{ name, isActive },
			{ new: true },
		);

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.json(category);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// DELETE CATEGORY (Admin → soft delete)
exports.deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await Category.findByIdAndUpdate(
			id,
			{ isActive: false },
			{ new: true },
		);

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.json({ message: "Category disabled" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
