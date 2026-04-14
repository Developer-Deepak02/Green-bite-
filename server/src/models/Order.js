const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		items: [
			{
				menuItemId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "MenuItem",
				},

				// Snapshot fields
				name: String,
				price: Number,
				quantity: Number,
			},
		],

		totalAmount: {
			type: Number,
			required: true,
		},

		// Snapshot address (not reference)
		address: {
			street: String,
			city: String,
			state: String,
			pincode: String,
		},

		status: {
			type: String,
			enum: [
				"pending",
				"confirmed",
				"preparing",
				"out_for_delivery",
				"delivered",
				"cancelled",
			],
			default: "pending",
		},

		estimatedDeliveryTime: {
			type: Number, // minutes
			default: 30,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
