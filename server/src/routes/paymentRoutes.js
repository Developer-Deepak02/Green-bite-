const express = require("express");
const router = express.Router();

const {
	createRazorpayOrder,
	verifyPayment,
	paymentFailed,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// ================= PAYMENT =================

// Create Razorpay order
router.post("/create-order", protect, createRazorpayOrder);

// Verify payment
router.post("/verify", protect, verifyPayment);
// Payment failure
router.post("/failure", protect, paymentFailed);

module.exports = router;
