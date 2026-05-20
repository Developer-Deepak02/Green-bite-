const MenuItem = require("../models/MenuItem");

// ================= CREATE =================
// CREATE MENU ITEM (Admin)
exports.createMenuItem = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			preparationTime,
			isAvailable,
			image,
		} = req.body;

		// Validation
		if (!name || !price || !category) {
			return res.status(400).json({
				message: "Name, price and category are required",
			});
		}

		// Cloudinary image URL
		const imageUrl = req.file ? req.file.path : image || "";

		const item = await MenuItem.create({
			name,
			description,
			price,
			category,
			image: imageUrl,
			preparationTime,
			isAvailable,
		});

		res.status(201).json(item);
	} catch (error) {
		console.error("CREATE MENU ITEM ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= READ =================
// GET ALL MENU ITEMS (Public)
exports.getMenuItems = async (req, res) => {
	try {
		const {
			category,
			search,
			minPrice,
			maxPrice,
			sort,
			page = 1,
			limit = 10,
		} = req.query;

		// ================= QUERY =================

		const query = {
			isAvailable: true,
		};

		// Category filter
		if (category) {
			query.category = category;
		}

		// Search filter
		if (typeof search === "string" && search.trim()) {
			query.name = {
				$regex: search,
				$options: "i",
			};
		}

		// Price filters
		if (minPrice || maxPrice) {
			query.price = {};

			if (minPrice) {
				query.price.$gte = Number(minPrice);
			}

			if (maxPrice) {
				query.price.$lte = Number(maxPrice);
			}
		}

		// ================= SORTING =================

		let sortOption = {
			createdAt: -1,
		};

		switch (sort) {
			case "price_asc":
				sortOption = { price: 1 };
				break;

			case "price_desc":
				sortOption = { price: -1 };
				break;

			case "rating_desc":
				sortOption = { ratingAverage: -1 };
				break;

			case "latest":
				sortOption = { createdAt: -1 };
				break;

			default:
				sortOption = { createdAt: -1 };
		}

		// ================= PAGINATION =================

		const pageNumber = Number(page);
		const limitNumber = Number(limit);

		const skip = (pageNumber - 1) * limitNumber;

		// ================= FETCH =================

		const totalItems = await MenuItem.countDocuments(query);

		const items = await MenuItem.find(query)
			.populate({
				path: "category",
				select: "name",
			})
			.sort(sortOption)
			.skip(skip)
			.limit(limitNumber)
			.lean();

		// ================= RESPONSE =================

		res.json({
			items,

			pagination: {
				totalItems,
				currentPage: pageNumber,
				totalPages: Math.ceil(totalItems / limitNumber),
				limit: limitNumber,
			},
		});
	} catch (error) {
		console.error("GET MENU ITEMS ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= SINGLE =================
// GET SINGLE ITEM
exports.getMenuItemById = async (req, res) => {
	try {
		const item = await MenuItem.findById(req.params.id).populate(
			"category",
			"name",
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found",
			});
		}

		res.json(item);
	} catch (error) {
		console.error("GET SINGLE MENU ITEM ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
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
			"preparationTime",
			"isAvailable",
			"image",
		];

		const updateData = {};

		// Update fields
		allowedFields.forEach((field) => {
			if (req.body[field] !== undefined) {
				updateData[field] = req.body[field];
			}
		});

		// Update image if uploaded
		if (req.file) {
			updateData.image = req.file.path;
		}

		const item = await MenuItem.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
		});

		if (!item) {
			return res.status(404).json({
				message: "Item not found",
			});
		}

		res.json(item);
	} catch (error) {
		console.error("UPDATE MENU ITEM ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= DELETE =================
// DELETE MENU ITEM (Admin)
exports.deleteMenuItem = async (req, res) => {
	try {
		const item = await MenuItem.findByIdAndDelete(req.params.id);

		if (!item) {
			return res.status(404).json({
				message: "Item not found",
			});
		}

		res.json({
			message: "Item deleted successfully",
		});
	} catch (error) {
		console.error("DELETE MENU ITEM ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= TOGGLE =================
// TOGGLE AVAILABILITY (Admin)
exports.toggleAvailability = async (req, res) => {
	try {
		const item = await MenuItem.findById(req.params.id);

		if (!item) {
			return res.status(404).json({
				message: "Item not found",
			});
		}

		item.isAvailable = !item.isAvailable;

		await item.save();

		res.json({
			message: "Availability updated",
			isAvailable: item.isAvailable,
		});
	} catch (error) {
		console.error("TOGGLE AVAILABILITY ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= ADMIN =================
// GET ALL MENU ITEMS FOR ADMIN
exports.getAllMenuItemsAdmin = async (req, res) => {
	try {
		const items = await MenuItem.find()
			.populate("category", "name")
			.sort({ createdAt: -1 });

		res.json(items);
	} catch (error) {
		console.error("ADMIN MENU ITEMS ERROR:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};
