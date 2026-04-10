const express = require("express");
const router = express.Router();

const {
	createMenuItem,
	getMenuItems,
	getMenuItemById,
	updateMenuItem,
	toggleAvailability,
} = require("../controllers/menuController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);

// Admin routes
router.post("/", protect, adminOnly, createMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.patch("/:id/toggle", protect, adminOnly, toggleAvailability);

module.exports = router;
