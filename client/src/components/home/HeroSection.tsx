import AppShell from "@/components/shared/AppShell";
import { ArrowRight, Clock3, Star, UtensilsCrossed } from "lucide-react";

export default function HomePage() {
	return (
		<AppShell>
			<section className="relative overflow-hidden">
				{/*  BACKGROUND GLOW */}

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
						grid
						lg:grid-cols-2
						gap-16
						items-center
						min-h-[calc(100vh-100px)]
						py-12
					"
				>
					{/* LEFT SIDE */}

					<div className="space-y-8">
						{/* TOP BADGE */}

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
								text-sm font-medium
							"
						>
							🔥 Freshly Prepared • Delivered Fast
						</div>

						{/* HERO CONTENT */}

						<div className="space-y-6">
							<h1
								className="
									text-5xl
									md:text-6xl
									lg:text-7xl
									font-black
									leading-tight
									tracking-tight
								"
							>
								Delicious Food
								<br />
								<span className="text-orange-500">Crafted With Passion</span>
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

						<div className="flex flex-wrap gap-4 pt-3">
							<button
								className="
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
									px-7 py-4
									rounded-2xl
									transition-all duration-300
									shadow-lg shadow-orange-500/20
									flex items-center gap-2
								"
							>
								Explore Menu
								<ArrowRight className="w-5 h-5" />
							</button>

							<button
								className="
									border border-gray-700
									bg-white/5
									hover:bg-white/10
									text-white
									font-semibold
									px-7 py-4
									rounded-2xl
									transition-all duration-300
								"
							>
								Track Order
							</button>
						</div>

						{/* STATS */}

						<div className="flex flex-wrap gap-10 pt-6">
							<div>
								<h3 className="text-3xl font-bold text-white">10K+</h3>

								<p className="text-sm text-gray-500 mt-1">Happy Customers</p>
							</div>

							<div>
								<h3 className="text-3xl font-bold text-white">50+</h3>

								<p className="text-sm text-gray-500 mt-1">Signature Dishes</p>
							</div>

							<div>
								<h3 className="text-3xl font-bold text-white">100%</h3>

								<p className="text-sm text-gray-500 mt-1">Fresh Ingredients</p>
							</div>
						</div>
					</div>

					{/* RIGHT SIDE */}

					<div className="relative">
						<div
							className="
								relative
								max-w-[560px]
								mx-auto
							"
						>
							{/* HERO IMAGE */}

							<img
								src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop"
								alt="Pizza"
								className="
									w-full
									h-[620px]
									object-cover
									rounded-[40px]
									shadow-2xl
								"
							/>

							{/* TOP FLOATING CARD */}

							<div
								className="
									absolute
									top-6
									left-[-30px]
									bg-[#111827]/95
									border border-gray-800
									backdrop-blur-xl
									rounded-2xl
									shadow-2xl shadow-black/50
									flex items-center gap-3
									px-5 py-4
									min-w-[230px]
								"
							>
								<div
									className="
										w-12 h-12
										bg-orange-500/20
										rounded-xl
										flex items-center justify-center
										flex-shrink-0
									"
								>
									<Star className="text-orange-500 w-6 h-6 fill-orange-500" />
								</div>

								<div>
									<h4 className="font-semibold text-white">
										Chef&apos;s Signature
									</h4>

									<p className="text-sm text-gray-400">Bestselling Pizza</p>
								</div>
							</div>

							{/* MIDDLE FLOATING CARD */}

							<div
								className="
		hidden sm:flex
		absolute
		bottom-35
		-left-6
		items-center
		gap-3
		bg-[#111827]/95
		backdrop-blur-xl
		border border-white/10
		rounded-2xl
		px-4 py-3
		shadow-2xl shadow-black/50
	"
							>
								<div
									className="
										w-12 h-12
										bg-orange-500/20
										rounded-xl
										flex items-center justify-center
										flex-shrink-0
									"
								>
									<UtensilsCrossed className="w-6 h-6 text-orange-500" />
								</div>

								<div>
									<h4 className="font-semibold text-white">Freshly Cooked</h4>

									<p className="text-sm text-gray-400">
										Made Daily By Our Chefs
									</p>
								</div>
							</div>

							{/* BOTTOM FLOATING CARD */}

							<div
								className="
									absolute
									bottom-6
									right-[-15px]
									bg-[#111827]/95
									border border-gray-800
									backdrop-blur-xl
									rounded-2xl
									shadow-2xl shadow-black/50
									flex items-center gap-3
									px-5 py-4
									min-w-[230px]
								"
							>
								<div
									className="
										w-12 h-12
										bg-green-500/20
										rounded-xl
										flex items-center justify-center
										flex-shrink-0
									"
								>
									<Clock3 className="text-green-500 w-6 h-6" />
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
		</AppShell>
	);
}
