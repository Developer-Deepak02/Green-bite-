"use client";

import Link from "next/link";

import { ArrowRight, Clock3, Star, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden px-4 md:px-8 xl:px-12">
			{/* BACKGROUND EFFECTS */}

			<div
				className="
					absolute
					top-1/2
					right-[-120px]
					-translate-y-1/2
					w-[520px]
					h-[520px]
					bg-orange-500/20
					blur-[140px]
					rounded-full
					-z-10
					pointer-events-none
				"
			/>

			<div
				className="
					absolute
					left-0
					top-0
					w-full
					h-full
					bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_35%)]
					-z-10
				"
			/>

			<div
				className="
					grid
					lg:grid-cols-2
					gap-16
					items-center
					min-h-[calc(100vh-100px)]
					py-14
				"
			>
				{/* LEFT CONTENT */}

				<div className="space-y-9">
					{/* TOP BADGE */}

					<div
						className="
							inline-flex
							items-center
							gap-2
							bg-orange-500/10
							border border-orange-500/20
							backdrop-blur-xl
							text-orange-400
							px-5 py-2.5
							rounded-full
							text-sm
							font-medium
							shadow-lg shadow-orange-500/10
						"
					>
						🔥 Freshly Prepared • Delivered Fast
					</div>

					{/* HERO TEXT */}

					<div className="space-y-7">
						<h1
							className="
								text-5xl
								sm:text-6xl
								lg:text-7xl
								font-black
								leading-[0.95]
								tracking-tight
								max-w-[700px]
							"
						>
							Delicious Food
							<br />
							<span
								className="
									text-orange-500
									drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]
								"
							>
								Crafted With Passion
							</span>
						</h1>

						<p
							className="
								text-gray-400
								text-lg
								md:text-xl
								max-w-xl
								leading-relaxed
							"
						>
							Experience handcrafted flavors made with fresh ingredients and
							delivered straight from our kitchen to your doorstep.
						</p>
					</div>

					{/* CTA BUTTONS */}

					<div className="flex flex-wrap gap-4 pt-2">
						{/* EXPLORE MENU */}

						<Link href="/menu">
							<Button
								size="lg"
								className="
									h-14
									px-8
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
									shadow-xl shadow-orange-500/20
									transition-all duration-300
									hover:scale-[1.02]
									group
									cursor-pointer
								"
							>
								Explore Menu
								<ArrowRight
									className="
										w-5 h-5
										ml-1
										transition-transform duration-300
										group-hover:translate-x-1
									"
								/>
							</Button>
						</Link>

						{/* TRACK ORDER */}

						<Link href="/orders">
							<Button
								variant="outline"
								size="lg"
								className="
									h-14
									px-8
									rounded-2xl
									border-white/10
									bg-white/[0.03]
									backdrop-blur-xl
									text-white
									hover:bg-white/10
									hover:text-white
									transition-all duration-300
									cursor-pointer
								"
							>
								Track Order
							</Button>
						</Link>
					</div>

					{/* STATS */}

					<div className="flex flex-wrap gap-10 pt-4">
						{[
							{
								value: "10K+",
								label: "Happy Customers",
							},
							{
								value: "50+",
								label: "Signature Dishes",
							},
							{
								value: "100%",
								label: "Fresh Ingredients",
							},
						].map((item) => (
							<div key={item.label}>
								<h3
									className="
										text-3xl
										font-black
										text-white
									"
								>
									{item.value}
								</h3>

								<p
									className="
										text-sm
										text-gray-500
										mt-1
									"
								>
									{item.label}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* RIGHT SIDE */}

				<div className="relative">
					<div
						className="
							relative
							max-w-[580px]
							mx-auto
						"
					>
						{/* IMAGE CONTAINER */}

						<div
							className="
								relative
								overflow-hidden
								rounded-[40px]
								border border-white/10
								shadow-[0_25px_80px_rgba(0,0,0,0.45)]
							"
						>
							<img
								src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop"
								alt="Pizza"
								className="
									w-full
									h-[620px]
									object-cover
									hover:scale-105
									transition-transform
									duration-700
								"
							/>

							<div
								className="
									absolute inset-0
									bg-gradient-to-t
									from-black/50
									via-transparent
									to-transparent
								"
							/>
						</div>

						{/* TOP CARD */}

						<div
							className="
								absolute
								top-6
								left-[-30px]
								bg-[#111827]/90
								backdrop-blur-2xl
								border border-white/10
								rounded-2xl
								shadow-2xl shadow-black/50
								flex items-center gap-4
								px-5 py-4
								min-w-[240px]
							"
						>
							<div
								className="
									w-12 h-12
									bg-orange-500/15
									rounded-xl
									flex items-center justify-center
									flex-shrink-0
								"
							>
								<Star className="w-6 h-6 text-orange-500 fill-orange-500" />
							</div>

							<div>
								<h4 className="font-semibold text-white">
									Chef&apos;s Signature
								</h4>

								<p className="text-sm text-gray-400">Bestselling Pizza</p>
							</div>
						</div>

						{/* MIDDLE CARD */}

						<div
							className="
								hidden sm:flex
								absolute
								bottom-36
								-left-6
								items-center
								gap-4
								bg-[#111827]/90
								backdrop-blur-2xl
								border border-white/10
								rounded-2xl
								px-5 py-4
								shadow-2xl shadow-black/50
								min-w-[250px]
							"
						>
							<div
								className="
									w-12 h-12
									bg-orange-500/15
									rounded-xl
									flex items-center justify-center
									flex-shrink-0
								"
							>
								<UtensilsCrossed className="w-6 h-6 text-orange-500" />
							</div>

							<div>
								<h4 className="font-semibold text-white">Freshly Cooked</h4>

								<p className="text-sm text-gray-400">Made Daily By Our Chefs</p>
							</div>
						</div>

						{/* DELIVERY CARD */}

						<div
							className="
								absolute
								bottom-6
								right-[-20px]
								bg-[#111827]/90
								backdrop-blur-2xl
								border border-white/10
								rounded-2xl
								shadow-2xl shadow-black/50
								flex items-center gap-4
								px-5 py-4
								min-w-[230px]
							"
						>
							<div
								className="
									w-12 h-12
									bg-green-500/15
									rounded-xl
									flex items-center justify-center
									flex-shrink-0
								"
							>
								<Clock3 className="w-6 h-6 text-green-500" />
							</div>

							<div>
								<h4 className="font-semibold text-white">15-20 Min</h4>

								<p className="text-sm text-gray-400">Fast Delivery</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
