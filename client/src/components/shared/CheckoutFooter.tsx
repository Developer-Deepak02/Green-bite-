import { ShieldCheck, Truck, Headphones, CreditCard } from "lucide-react";

export default function CheckoutFooter() {
	return (
		<footer
			className="
				border-t border-white/10
				bg-white/[0.02]
				backdrop-blur-xl
				mt-14
			"
		>
			<div
				className="
					max-w-7xl
					mx-auto
					px-4 md:px-6
					py-6
				"
			>
				{/* TOP */}

				<div
					className="
						grid
						grid-cols-2
						md:grid-cols-4
						gap-4
					"
				>
					<div
						className="
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							p-4
							flex
							items-center
							gap-3
						"
					>
						<div
							className="
								w-11 h-11
								rounded-xl
								bg-green-500/10
								border border-green-500/20
								flex items-center justify-center
								shrink-0
							"
						>
							<ShieldCheck className="w-5 h-5 text-green-400" />
						</div>

						<div>
							<p className="text-sm font-semibold text-white">Secure Payment</p>

							<p className="text-xs text-gray-500 mt-1">Encrypted checkout</p>
						</div>
					</div>

					<div
						className="
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							p-4
							flex
							items-center
							gap-3
						"
					>
						<div
							className="
								w-11 h-11
								rounded-xl
								bg-orange-500/10
								border border-orange-500/20
								flex items-center justify-center
								shrink-0
							"
						>
							<Truck className="w-5 h-5 text-orange-400" />
						</div>

						<div>
							<p className="text-sm font-semibold text-white">Fast Delivery</p>

							<p className="text-xs text-gray-500 mt-1">
								Quick doorstep service
							</p>
						</div>
					</div>

					<div
						className="
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							p-4
							flex
							items-center
							gap-3
						"
					>
						<div
							className="
								w-11 h-11
								rounded-xl
								bg-sky-500/10
								border border-sky-500/20
								flex items-center justify-center
								shrink-0
							"
						>
							<Headphones className="w-5 h-5 text-sky-400" />
						</div>

						<div>
							<p className="text-sm font-semibold text-white">24/7 Support</p>

							<p className="text-xs text-gray-500 mt-1">Always here to help</p>
						</div>
					</div>

					<div
						className="
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							p-4
							flex
							items-center
							gap-3
						"
					>
						<div
							className="
								w-11 h-11
								rounded-xl
								bg-purple-500/10
								border border-purple-500/20
								flex items-center justify-center
								shrink-0
							"
						>
							<CreditCard className="w-5 h-5 text-purple-400" />
						</div>

						<div>
							<p className="text-sm font-semibold text-white">
								Trusted Payments
							</p>

							<p className="text-xs text-gray-500 mt-1">Razorpay secured</p>
						</div>
					</div>
				</div>

				{/* BOTTOM */}

				<div
					className="
						mt-6
						pt-5
						border-t border-white/10
						flex
						flex-col
						md:flex-row
						items-center
						justify-between
						gap-3
					"
				>
					<p className="text-sm text-gray-500 text-center md:text-left">
						© 2026 BiteRush. All rights reserved.
					</p>

					<div className="flex items-center gap-4 text-xs text-gray-500">
						<button className="hover:text-white transition-colors">
							Privacy Policy
						</button>

						<button className="hover:text-white transition-colors">
							Terms
						</button>

						<button className="hover:text-white transition-colors">
							Support
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
