const express = require("express");
const router = express.Router();

const {
	createOrder,
	getUserOrders,
	getOrderById,
	getAllOrders,
	updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// ================= USER =================

// Create order
router.post("/", protect, createOrder);

// Get user's orders
router.get("/my", protect, getUserOrders);
// Get single order details
router.get("/:id", protect, getOrderById);

// ================= ADMIN =================

// Get ALL orders (admin only)
router.get("/admin", protect, isAdmin, getAllOrders);

// Update order status (admin only)
router.put("/admin/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
