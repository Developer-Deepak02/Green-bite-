"use client";

import { useMemo, useState } from "react";

import { Tag, Truck, Receipt, BadgePercent } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CartSummaryProps {
	subtotal: number;

	onCheckout: () => void;

	loading?: boolean;
}

export default function CartSummary({
	subtotal,
	onCheckout,
	loading = false,
}: CartSummaryProps) {
	const [coupon, setCoupon] = useState("");

	const discount = useMemo(() => {
		if (coupon.trim().toUpperCase() === "SAVE20") {
			return subtotal * 0.2;
		}

		return 0;
	}, [coupon, subtotal]);

	const deliveryFee = subtotal > 499 ? 0 : 40;

	const tax = Math.round(subtotal * 0.05);

	const total = subtotal + deliveryFee + tax - discount;

	return (
		<div
			className="
				sticky
				top-28
				rounded-[32px]
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-2xl
				p-7
				overflow-hidden
			"
		>
			{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-0
					right-0
					w-[220px]
					h-[220px]
					bg-orange-500/10
					blur-[120px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-10">
				{/* HEADER */}

				<div className="mb-8">
					<div
						className="
							inline-flex
							items-center
							gap-2
							bg-orange-500/10
							border border-orange-500/20
							text-orange-400
							px-4 py-2
							rounded-full
							text-sm
							font-medium
							mb-5
						"
					>
						<Receipt className="w-4 h-4" />
						Order Summary
					</div>

					<h2
						className="
							text-3xl
							font-black
							text-white
							leading-tight
						"
					>
						Checkout
						<span className="text-orange-500"> Details</span>
					</h2>
				</div>

				{/* COUPON */}

				<div className="space-y-4 mb-8">
					<label
						className="
							text-sm
							font-medium
							text-gray-400
						"
					>
						Promo Code
					</label>

					<div className="relative">
						<Tag
							className="
								absolute
								left-4
								top-1/2
								-translate-y-1/2
								w-5
								h-5
								text-orange-400
							"
						/>

						<input
							type="text"
							placeholder="Enter coupon code"
							value={coupon}
							onChange={(e) => setCoupon(e.target.value)}
							className="
								w-full
								h-14
								pl-12
								pr-4
								rounded-2xl
								bg-white/[0.03]
								border border-white/10
								text-white
								placeholder:text-gray-500
								outline-none
								transition-all duration-300
								focus:border-orange-500/40
							"
						/>
					</div>

					{coupon.toUpperCase() === "SAVE20" && (
						<div
							className="
								flex
								items-center
								gap-2
								text-green-400
								text-sm
							"
						>
							<BadgePercent className="w-4 h-4" />
							20% discount applied
						</div>
					)}
				</div>

				{/* PRICE DETAILS */}

				<div className="space-y-5">
					<div
						className="
							flex
							items-center
							justify-between
						"
					>
						<div className="flex items-center gap-2 text-gray-400">
							<Receipt className="w-4 h-4" />
							Subtotal
						</div>

						<p className="text-white font-semibold">₹{subtotal}</p>
					</div>

					<div
						className="
							flex
							items-center
							justify-between
						"
					>
						<div className="flex items-center gap-2 text-gray-400">
							<Truck className="w-4 h-4" />
							Delivery Fee
						</div>

						<p className="text-white font-semibold">
							{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
						</p>
					</div>

					<div
						className="
							flex
							items-center
							justify-between
						"
					>
						<div className="text-gray-400">Tax & Charges</div>

						<p className="text-white font-semibold">₹{tax}</p>
					</div>

					{discount > 0 && (
						<div
							className="
								flex
								items-center
								justify-between
							"
						>
							<div className="text-green-400">Discount</div>

							<p className="font-semibold text-green-400">
								-₹{Math.round(discount)}
							</p>
						</div>
					)}

					<div className="border-t border-white/10 pt-5">
						<div
							className="
								flex
								items-end
								justify-between
							"
						>
							<div>
								<p className="text-sm text-gray-500">Grand Total</p>

								<h3
									className="
										text-4xl
										font-black
										text-white
										mt-1
									"
								>
									₹{Math.round(total)}
								</h3>
							</div>

							{deliveryFee === 0 && (
								<div
									className="
										bg-green-500/10
										border border-green-500/20
										text-green-400
										text-xs
										font-semibold
										px-3 py-2
										rounded-full
									"
								>
									Free Delivery
								</div>
							)}
						</div>
					</div>
				</div>

				{/* CHECKOUT BUTTON */}

				<Button
					onClick={onCheckout}
					disabled={loading}
					className="
						mt-8
						w-full
						h-14
						rounded-2xl
						bg-orange-500
						hover:bg-orange-600
						text-white
						font-semibold
						text-base
						shadow-xl shadow-orange-500/20
						transition-all duration-300
						disabled:opacity-60
					"
				>
					{loading ? "Placing Order..." : "Place Order"}
				</Button>

				{/* INFO */}

				<p
					className="
						mt-5
						text-xs
						text-center
						text-gray-500
						leading-relaxed
					"
				>
					Secure checkout powered by BiteRush. Your order will be confirmed
					instantly.
				</p>
			</div>
		</div>
	);
}
