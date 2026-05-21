"use client";

import Link from "next/link";

import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function CheckoutNavbar() {
	return (
		<header
			className="
				sticky
				top-0
				z-50
				backdrop-blur-2xl
				bg-[#020817]/80
				border-b border-white/10
			"
		>
			<div
				className="
					max-w-7xl
					mx-auto
					h-16
					px-4 md:px-6
					flex
					items-center
					justify-between
				"
			>
				{/* LEFT */}

				<div className="flex items-center gap-4">
					<Link
						href="/menu"
						className="
							w-10 h-10
							rounded-xl
							bg-white/[0.04]
							border border-white/10
							flex items-center justify-center
							text-gray-300
							hover:text-white
							hover:border-white/20
							transition-all
						"
					>
						<ArrowLeft className="w-4 h-4" />
					</Link>

					<div>
						<Link
							href="/"
							className="
								text-2xl
								font-black
								tracking-tight
								text-white
							"
						>
							Bite<span className="text-orange-500">Rush</span>
						</Link>

						<p className="text-[11px] text-gray-500 -mt-1">Secure checkout</p>
					</div>
				</div>

				{/* RIGHT */}

				<div
					className="
						hidden
						sm:flex
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
					<ShieldCheck className="w-4 h-4" />
					100% Secure Payment
				</div>
			</div>
		</header>
	);
}
