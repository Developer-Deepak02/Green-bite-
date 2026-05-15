const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ================= STORAGE =================
const storage = new CloudinaryStorage({
	cloudinary,

	params: async (req, file) => ({
		folder: "greenbite",

		allowed_formats: ["jpg", "jpeg", "png", "webp"],

		public_id: Date.now() + "-" + file.originalname.split(".")[0],
	}),
});

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only image files are allowed"), false);
	}
};

// ================= MULTER =================
const upload = multer({
	storage,

	fileFilter,

	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

module.exports = upload;
