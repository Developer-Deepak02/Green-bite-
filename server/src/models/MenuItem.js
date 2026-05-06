const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: String,

		price: {
			type: Number,
			required: true,
			min: 0,
		},

		image: String,

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},

		isAvailable: {
			type: Boolean,
			default: true,
		},

		// Used for delivery estimation logic
		preparationTime: {
			type: Number,
			default: 15, // minutes
		},

		ratingAverage: {
			type: Number,
			default: 0,
		},

		ratingCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
