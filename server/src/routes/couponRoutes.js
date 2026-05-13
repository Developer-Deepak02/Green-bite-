const express = require("express");

const router = express.Router();

const {
	createCoupon,
	getCoupons,
	applyCoupon,
	updateCoupon,
	deleteCoupon,
} = require("../controllers/couponController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================= USER =================

// Apply coupon
router.post("/apply", protect, applyCoupon);

// ================= ADMIN =================

// Get all coupons
router.get("/", protect, adminOnly, getCoupons);

// Create coupon
router.post("/", protect, adminOnly, createCoupon);

// Update coupon
router.put("/:id", protect, adminOnly, updateCoupon);

// Disable coupon
router.delete("/:id", protect, adminOnly, deleteCoupon);

module.exports = router;
