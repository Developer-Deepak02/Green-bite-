"use client";

import Link from "next/link";

import { XCircle, RefreshCcw, ArrowLeft, CreditCard } from "lucide-react";

export default function OrderFailedPage() {
	return (
		<section className="min-h-screen bg-[#020817] overflow-hidden relative flex items-center justify-center px-4">
			{/* BACKGROUND */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-red-500/10 blur-[180px] rounded-full pointer-events-none" />

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
							bg-red-500/10
							border border-red-500/20
							flex items-center justify-center
							mb-8
						"
					>
						<XCircle className="w-14 h-14 text-red-400" />
					</div>

					{/* CONTENT */}

					<div className="space-y-4">
						<div
							className="
								inline-flex
								items-center
								gap-2
								px-4 py-2
								rounded-full
								bg-red-500/10
								border border-red-500/20
								text-red-400
								text-sm
								font-medium
							"
						>
							<CreditCard className="w-4 h-4" />
							Payment Failed
						</div>

						<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
							Payment
							<span className="text-red-400"> Unsuccessful</span>
						</h1>

						<p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
							Your payment could not be completed or was cancelled. No worries —
							you can try again anytime.
						</p>
					</div>

					{/* INFO */}

					<div
						className="
							mt-10
							rounded-3xl
							bg-white/[0.03]
							border border-white/10
							p-6
							text-left
						"
					>
						<h3 className="text-white font-bold text-lg mb-4">
							Possible Reasons
						</h3>

						<ul className="space-y-3 text-gray-400 text-sm">
							<li>• Payment was cancelled manually</li>
							<li>• Insufficient bank balance</li>
							<li>• Network or payment gateway issue</li>
							<li>• UPI or card verification failed</li>
						</ul>
					</div>

					{/* BUTTONS */}

					<div className="mt-10 flex flex-col sm:flex-row gap-4">
						<Link
							href="/cart"
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
							<RefreshCcw className="w-4 h-4" />
							Try Again
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
								flex items-center justify-center gap-2
								transition-all duration-300
							"
						>
							<ArrowLeft className="w-4 h-4" />
							Back To Menu
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
