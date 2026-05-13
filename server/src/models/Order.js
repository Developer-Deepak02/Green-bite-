const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
	{
		menuItemId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MenuItem",
		},

		name: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			required: true,
		},

		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
	},
	{ _id: false }, // prevents unnecessary _id inside items array
);

const addressSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		street: {
			type: String,
			required: true,
		},

		city: {
			type: String,
			required: true,
		},

		state: {
			type: String,
			required: true,
		},

		pincode: {
			type: String,
			required: true,
		},
	},
	{ _id: false },
);

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		items: {
			type: [orderItemSchema],
			required: true,
		},

		subtotalAmount: {
			type: Number,
			required: true,
			min: 0,
		},

		discountAmount: {
			type: Number,
			default: 0,
			min: 0,
		},

		coupon: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Coupon",
		},

		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},

		address: {
			type: addressSchema,
			required: true,
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

		isPaid: {
			type: Boolean,
			default: false,
		},

		paidAt: Date,

		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed"],
			default: "pending",
		},

		paymentMethod: {
			type: String,
			default: "razorpay",
		},

		razorpayOrderId: {
			type: String,
			default: null,
		},

		razorpayPaymentId: {
			type: String,
			default: null,
		},

		estimatedDeliveryTime: {
			type: Number, // minutes
			default: 30,
		},
	},
	{ timestamps: true },
);

orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ user: 1 });

module.exports = mongoose.model("Order", orderSchema);
