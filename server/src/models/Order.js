const mongoose = require("mongoose");

// ================= ORDER ITEM SCHEMA =================

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
	{
		_id: false,
	},
);

// ================= ADDRESS SCHEMA =================

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
	{
		_id: false,
	},
);

// ================= STATUS HISTORY SCHEMA =================

const statusHistorySchema = new mongoose.Schema(
	{
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
			required: true,
		},

		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		_id: false,
	},
);

// ================= ORDER SCHEMA =================

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

		statusHistory: {
			type: [statusHistorySchema],
			default: [],
		},

		isPaid: {
			type: Boolean,
			default: false,
		},

		paidAt: {
			type: Date,
			default: null,
		},

		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed"],
			default: "pending",
		},

		paymentMethod: {
			type: String,
			enum: ["cod", "razorpay"],
			default: "cod",
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
			type: Number,
			default: 30, // minutes
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	},
);

// ================= DELIVERY TRACKING VIRTUALS =================

const orderSteps = [
	"pending",
	"confirmed",
	"preparing",
	"out_for_delivery",
	"delivered",
];

// Current active step
orderSchema.virtual("currentStep").get(function () {
	return orderSteps.indexOf(this.status) + 1;
});

// Total steps
orderSchema.virtual("totalSteps").get(function () {
	return orderSteps.length;
});

// Progress percentage
orderSchema.virtual("progressPercentage").get(function () {
	const currentStep = orderSteps.indexOf(this.status) + 1;

	return Math.round((currentStep / orderSteps.length) * 100);
});

// ================= INDEXES =================

orderSchema.index({
	status: 1,
});

orderSchema.index({
	createdAt: -1,
});

orderSchema.index({
	user: 1,
});

// ================= EXPORT =================

module.exports = mongoose.model("Order", orderSchema);
