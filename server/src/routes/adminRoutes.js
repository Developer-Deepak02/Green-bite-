const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET DASHBOARD STATS
router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
