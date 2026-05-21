const express = require("express");

const router = express.Router();

const {
	getUsers,
	toggleBlockUser,
	changeUserRole,
	deleteUser,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================= ADMIN USER MANAGEMENT =================

// Get all users
router.get("/", protect, adminOnly, getUsers);

// Block / unblock user
router.put("/:id/block", protect, adminOnly, toggleBlockUser);

// Change role
router.put("/:id/role", protect, adminOnly, changeUserRole);

// Delete user
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
