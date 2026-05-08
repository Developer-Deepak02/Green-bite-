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

// ================= PUBLIC =================
router.get("/", getMenuItems);

// ================= ADMIN =================
router.post("/", protect, adminOnly, createMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);
router.patch("/:id/toggle", protect, adminOnly, toggleAvailability);
router.get("/admin", protect, adminOnly, getAllMenuItemsAdmin);

// ================= PUBLIC (AFTER ADMIN) =================
router.get("/:id", getMenuItemById);

module.exports = router;
