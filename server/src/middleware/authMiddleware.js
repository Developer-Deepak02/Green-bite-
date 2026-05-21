const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= PROTECT =================

exports.protect = async (req, res, next) => {
	let token;

	// Bearer token
	if (req.headers.authorization?.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res.status(401).json({
			message: "Not authorized",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
			});
		}

		// BLOCK CHECK
		if (user.isBlocked) {
			return res.status(403).json({
				message: "Your account has been blocked",
			});
		}

		// Attach user
		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({
			message: "Token invalid",
		});
	}
};

// ================= ADMIN ONLY =================

exports.adminOnly = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({
			message: "Admin access required",
		});
	}
};
