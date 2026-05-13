const Coupon = require("../models/Coupon");

// ================= CREATE COUPON =================
exports.createCoupon = async (req, res) => {
	try {
		const {
			code,
			discountType,
			discountValue,
			minimumOrderAmount,
			expiryDate,
			usageLimit,
		} = req.body;

		// Validation
		if (!code || !discountType || !discountValue || !expiryDate) {
			return res.status(400).json({
				message: "Required fields missing",
			});
		}

		// Check duplicate
		const existingCoupon = await Coupon.findOne({
			code: code.toUpperCase(),
		});

		if (existingCoupon) {
			return res.status(400).json({
				message: "Coupon already exists",
			});
		}

		const coupon = await Coupon.create({
			code: code.toUpperCase(),
			discountType,
			discountValue,
			minimumOrderAmount,
			expiryDate,
			usageLimit,
		});

		res.status(201).json(coupon);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= GET ALL COUPONS =================
exports.getCoupons = async (req, res) => {
	try {
		const coupons = await Coupon.find().sort({ createdAt: -1 });

		res.json(coupons);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= APPLY COUPON =================
exports.applyCoupon = async (req, res) => {
	try {
		const { code, totalAmount } = req.body;

		if (!code || totalAmount === undefined) {
			return res.status(400).json({
				message: "Code and total amount required",
			});
		}

		const coupon = await Coupon.findOne({
			code: code.toUpperCase(),
			isActive: true,
		});

		if (!coupon) {
			return res.status(404).json({
				message: "Invalid coupon",
			});
		}

		// Expired check
		if (new Date() > coupon.expiryDate) {
			return res.status(400).json({
				message: "Coupon expired",
			});
		}

		// Usage limit check
		if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
			return res.status(400).json({
				message: "Coupon usage limit reached",
			});
		}

		// Minimum order check
		if (totalAmount < coupon.minimumOrderAmount) {
			return res.status(400).json({
				message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
			});
		}

		// Calculate discount
		let discountAmount = 0;

		if (coupon.discountType === "percentage") {
			discountAmount = (totalAmount * coupon.discountValue) / 100;
		} else {
			discountAmount = coupon.discountValue;
		}

		// Prevent negative total
		if (discountAmount > totalAmount) {
			discountAmount = totalAmount;
		}

		const finalAmount = totalAmount - discountAmount;

		res.json({
			message: "Coupon applied",
			couponCode: coupon.code,
			discountAmount,
			finalAmount,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= UPDATE COUPON =================
exports.updateCoupon = async (req, res) => {
	try {
		const coupon = await Coupon.findById(req.params.id);

		if (!coupon) {
			return res.status(404).json({
				message: "Coupon not found",
			});
		}

		Object.keys(req.body).forEach((key) => {
			coupon[key] = req.body[key];
		});

		await coupon.save();

		res.json(coupon);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= DISABLE COUPON =================
exports.deleteCoupon = async (req, res) => {
	try {
		const coupon = await Coupon.findById(req.params.id);

		if (!coupon) {
			return res.status(404).json({
				message: "Coupon not found",
			});
		}

		coupon.isActive = false;

		await coupon.save();

		res.json({
			message: "Coupon disabled",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
