const express = require("express");
const router = express.Router();

const {
	addAddress,
	getAddresses,
	deleteAddress,
} = require("../controllers/addressController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.delete("/:id", protect, deleteAddress);

module.exports = router;
