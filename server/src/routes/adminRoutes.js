const express = require("express");

const router = express.Router();

const {
	getDashboardStats,
	getAllOrders,
	updateOrderStatus,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================= DASHBOARD =================

router.get("/dashboard", protect, adminOnly, getDashboardStats);

// ================= ADMIN ORDERS =================

router.get("/orders", protect, adminOnly, getAllOrders);

router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
