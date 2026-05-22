"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import {
	HandPlatter,
	Clock3,
	ShieldCheck,
	Star,
	Truck,
	ChefHat,
} from "lucide-react";

export default function AboutPage() {
	const features = [
		{
			title: "Fresh Ingredients",
			description:
				"We use only premium quality ingredients prepared fresh every day.",
			icon: ChefHat,
		},
		{
			title: "Fast Delivery",
			description:
				"Lightning-fast delivery system designed for modern food lovers.",
			icon: Truck,
		},
		{
			title: "Trusted Quality",
			description:
				"Thousands of happy customers trust BiteRush for delicious meals.",
			icon: ShieldCheck,
		},
	];

	const stats = [
		{
			label: "Happy Customers",
			value: "10K+",
		},
		{
			label: "Orders Delivered",
			value: "50K+",
		},
		{
			label: "Food Items",
			value: "120+",
		},
		{
			label: "Average Rating",
			value: "4.9",
		},
	];

	return (
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			{/* NAVBAR */}

			<Navbar />

			{/* BACKGROUND */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			{/* HERO */}

			<section className="relative z-10 pt-20 pb-16">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					<div className="max-w-4xl mx-auto text-center">
						<div
							className="
								inline-flex
								items-center
								gap-2
								px-5 py-2
								rounded-full
								bg-orange-500/10
								border border-orange-500/20
								text-orange-400
								text-sm
								font-medium
								mb-6
							"
						>
							<HandPlatter className="w-4 h-4" />
							About BiteRush
						</div>

						<h1
							className="
								text-5xl
								md:text-7xl
								font-black
								leading-tight
								tracking-tight
							"
						>
							Delicious Food
							<span className="text-orange-500"> Delivered Fast</span>
						</h1>

						<p
							className="
								mt-8
								text-lg
								md:text-xl
								text-gray-400
								leading-relaxed
								max-w-3xl
								mx-auto
							"
						>
							BiteRush is a modern food delivery platform focused on premium
							meals, fast delivery, and exceptional customer experience.
							Designed for food lovers who value quality and convenience.
						</p>
					</div>
				</div>
			</section>

			{/* STATS */}

			<section className="relative z-10 pb-20">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="
									rounded-[32px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-2xl
									p-8
									text-center
								"
							>
								<h2 className="text-5xl font-black text-orange-500">
									{stat.value}
								</h2>

								<p className="text-gray-400 mt-3">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FEATURES */}

			<section className="relative z-10 pb-24">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					<div className="text-center mb-14">
						<h2 className="text-4xl md:text-5xl font-black">
							Why Choose
							<span className="text-orange-500"> BiteRush</span>
						</h2>

						<p className="text-gray-400 mt-5 text-lg">
							Experience food delivery designed for speed, quality, and comfort.
						</p>
					</div>

					<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
						{features.map((feature) => {
							const Icon = feature.icon;

							return (
								<div
									key={feature.title}
									className="
										rounded-[36px]
										border border-white/10
										bg-white/[0.03]
										backdrop-blur-2xl
										p-8
										hover:border-orange-500/20
										transition-all duration-300
									"
								>
									<div
										className="
											w-16 h-16
											rounded-3xl
											bg-orange-500/10
											border border-orange-500/20
											flex items-center justify-center
											mb-6
										"
									>
										<Icon className="w-8 h-8 text-orange-500" />
									</div>

									<h3 className="text-2xl font-bold text-white">
										{feature.title}
									</h3>

									<p className="text-gray-400 mt-4 leading-relaxed">
										{feature.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* STORY */}

			<section className="relative z-10 pb-24">
				<div className="max-w-6xl mx-auto px-4 md:px-6">
					<div
						className="
							rounded-[40px]
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-2xl
							p-8 md:p-14
						"
					>
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div>
								<div
									className="
										inline-flex
										items-center
										gap-2
										px-4 py-2
										rounded-full
										bg-orange-500/10
										border border-orange-500/20
										text-orange-400
										text-sm
										font-medium
										mb-6
									"
								>
									<Clock3 className="w-4 h-4" />
									Our Story
								</div>

								<h2 className="text-4xl font-black leading-tight">
									Making Food Ordering
									<span className="text-orange-500"> Simple & Fast</span>
								</h2>

								<p className="text-gray-400 mt-6 leading-relaxed text-lg">
									BiteRush started with one goal — creating a smooth and modern
									food ordering experience for everyone. From handcrafted meals
									to real-time order tracking, every feature is designed to make
									food delivery easier, faster, and more enjoyable.
								</p>
							</div>

							<div
								className="
									rounded-[36px]
									bg-gradient-to-br
									from-orange-500
									to-orange-700
									p-10
									text-center
									shadow-2xl shadow-orange-500/20
								"
							>
								<div
									className="
										w-24 h-24
										mx-auto
										rounded-full
										bg-white/10
										flex items-center justify-center
										mb-6
									"
								>
									<Star className="w-12 h-12 text-white fill-white" />
								</div>

								<h3 className="text-3xl font-black text-white">
									4.9 Customer Rating
								</h3>

								<p className="text-orange-100 mt-4 leading-relaxed">
									Loved by thousands of customers for exceptional taste and
									reliable delivery.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}

			<Footer />
		</div>
	);
}
