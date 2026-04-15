const express = require("express");
const router = express.Router();

const {
	createOrder,
	getUserOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create order
router.post("/", protect, createOrder);

// Get user's orders
router.get("/my", protect, getUserOrders); 

module.exports = router;
