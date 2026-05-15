const express = require("express");

const router = express.Router();

const {
	createMenuItem,
	getMenuItems,
	getMenuItemById,
	getAllMenuItemsAdmin,
	updateMenuItem,
	deleteMenuItem,
	toggleAvailability,
} = require("../controllers/menuController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// ================= PUBLIC =================

// Get all menu items
router.get("/", getMenuItems);

// Get single menu item
router.get("/:id", getMenuItemById);

// ================= ADMIN =================

// Create menu item with image upload
router.post("/", protect, adminOnly, upload.single("image"), createMenuItem);

// Update menu item with optional image upload
router.put("/:id", protect, adminOnly, upload.single("image"), updateMenuItem);

// Delete menu item
router.delete("/:id", protect, adminOnly, deleteMenuItem);

// Toggle availability
router.patch("/:id/toggle", protect, adminOnly, toggleAvailability);

// Get all menu items for admin
router.get("/admin/all", protect, adminOnly, getAllMenuItemsAdmin);

module.exports = router;
