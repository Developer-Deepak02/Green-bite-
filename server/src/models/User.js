const mongoose = require("mongoose");

// ================= CART ITEM SCHEMA =================

const cartItemSchema = new mongoose.Schema(
	{
		menuItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MenuItem",
			required: true,
		},

		quantity: {
			type: Number,
			required: true,
			min: 1,
			default: 1,
		},
	},
	{ _id: false },
);

// ================= USER SCHEMA =================

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},

		password: {
			type: String,
			required: true,
			minlength: 6,
		},

		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},

		blockedAt: {
			type: Date,
			default: null,
		},

		lastLoginAt: {
			type: Date,
			default: null,
		},

		// ================= WISHLIST =================

		wishlist: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "MenuItem",
			},
		],

		// ================= CART =================

		cart: {
			type: [cartItemSchema],
			default: [],
		},
	},
	{ timestamps: true },
);

userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
