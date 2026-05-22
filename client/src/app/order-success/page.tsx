"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	CheckCircle2,
	Clock3,
	MapPin,
	PackageCheck,
	ArrowRight,
} from "lucide-react";

export default function OrderSuccessPage() {
	const searchParams = useSearchParams();

	const orderId = searchParams.get("orderId");

	return (
		<section className="min-h-screen bg-[#020817] overflow-hidden relative flex items-center justify-center px-4">
			{/* BACKGROUND */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			<div className="relative z-10 w-full max-w-2xl">
				<div
					className="
						rounded-[40px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-8 md:p-10
						text-center
					"
				>
					{/* ICON */}

					<div
						className="
							w-28 h-28
							mx-auto
							rounded-full
							bg-green-500/10
							border border-green-500/20
							flex items-center justify-center
							mb-8
						"
					>
						<CheckCircle2 className="w-14 h-14 text-green-400" />
					</div>

					{/* TITLE */}

					<div className="space-y-4">
						<div
							className="
								inline-flex
								items-center
								gap-2
								px-4 py-2
								rounded-full
								bg-green-500/10
								border border-green-500/20
								text-green-400
								text-sm
								font-medium
							"
						>
							<PackageCheck className="w-4 h-4" />
							Order Confirmed
						</div>

						<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
							Order Placed
							<span className="text-orange-500"> Successfully</span>
						</h1>

						<p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
							Your delicious meal is being prepared and will arrive soon.
						</p>
					</div>

					{/* ORDER DETAILS */}

					<div
						className="
							mt-10
							grid
							md:grid-cols-3
							gap-4
						"
					>
						<div
							className="
								rounded-3xl
								bg-white/[0.03]
								border border-white/10
								p-5
							"
						>
							<Clock3 className="w-6 h-6 text-orange-400 mx-auto mb-3" />

							<p className="text-sm text-gray-400">Estimated Delivery</p>

							<h3 className="text-white font-bold mt-2">25 - 35 mins</h3>
						</div>

						<div
							className="
								rounded-3xl
								bg-white/[0.03]
								border border-white/10
								p-5
							"
						>
							<PackageCheck className="w-6 h-6 text-orange-400 mx-auto mb-3" />

							<p className="text-sm text-gray-400">Order Status</p>

							<h3 className="text-green-400 font-bold mt-2">Confirmed</h3>
						</div>

						<div
							className="
								rounded-3xl
								bg-white/[0.03]
								border border-white/10
								p-5
							"
						>
							<MapPin className="w-6 h-6 text-orange-400 mx-auto mb-3" />

							<p className="text-sm text-gray-400">Tracking Ready</p>

							<h3 className="text-white font-bold mt-2">Live Soon</h3>
						</div>
					</div>

					{/* ORDER ID */}

					{orderId && (
						<div
							className="
								mt-8
								rounded-3xl
								bg-orange-500/10
								border border-orange-500/20
								p-5
							"
						>
							<p className="text-sm text-orange-300">Order ID</p>

							<p className="text-white font-mono text-lg mt-2 break-all">
								{orderId}
							</p>
						</div>
					)}

					{/* BUTTONS */}

					<div className="mt-10 flex flex-col sm:flex-row gap-4">
						<Link
							href="/orders"
							className="
								flex-1
								h-14
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								text-white
								font-semibold
								flex items-center justify-center gap-2
								transition-all duration-300
								shadow-xl shadow-orange-500/20
							"
						>
							View Orders
							<ArrowRight className="w-4 h-4" />
						</Link>

						<Link
							href="/menu"
							className="
								flex-1
								h-14
								rounded-2xl
								border border-white/10
								bg-white/[0.03]
								hover:bg-white/[0.06]
								text-white
								font-semibold
								flex items-center justify-center
								transition-all duration-300
							"
						>
							Order More Food
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
