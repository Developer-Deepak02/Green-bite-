"use client";

import { Bike, ShieldCheck, ChefHat, MapPinned } from "lucide-react";

const features = [
	{
		icon: Bike,
		title: "Lightning Fast Delivery",
		description:
			"Get your favorite meals delivered hot and fresh within minutes right to your doorstep.",
	},

	{
		icon: ChefHat,
		title: "Expert Chefs",
		description:
			"Our dishes are prepared by experienced chefs using premium ingredients and bold flavors.",
	},

	{
		icon: ShieldCheck,
		title: "100% Hygienic",
		description:
			"We follow strict hygiene standards to ensure every meal is fresh, clean, and safe.",
	},

	{
		icon: MapPinned,
		title: "Live Order Tracking",
		description:
			"Track your order in real-time from kitchen preparation to doorstep delivery.",
	},
];

export default function WhyChooseUs() {
	return (
		<section className="relative py-32 overflow-hidden">
			{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-1/2
					left-1/2
					-translate-x-1/2
					-translate-y-1/2
					w-[900px]
					h-[900px]
					bg-orange-500/10
					blur-[220px]
					rounded-full
					pointer-events-none
				"
			/>

			<div
				className="
					absolute
					inset-0
					bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06),transparent_35%)]
					pointer-events-none
				"
			/>

			<div
				className="
					relative z-10
					px-4
					md:px-8
					xl:px-12
				"
			>
				{/* HEADER */}

				<div
					className="
						max-w-3xl
						mx-auto
						text-center
						mb-20
					"
				>
					<div
						className="
							inline-flex
							items-center
							bg-orange-500/10
							border border-orange-500/20
							backdrop-blur-xl
							text-orange-400
							text-sm
							font-medium
							px-4 py-2
							rounded-full
							mb-6
						"
					>
						Why BiteRush
					</div>

					<h2
						className="
							text-4xl
							md:text-5xl
							lg:text-6xl
							font-black
							text-white
							tracking-tight
							leading-none
						"
					>
						Why Customers
						<span className="text-orange-500"> Love Us</span>
					</h2>

					<p
						className="
							mt-6
							text-lg
							text-gray-400
							leading-relaxed
						"
					>
						We combine premium quality food, fast delivery, and exceptional
						service to create the ultimate food experience.
					</p>
				</div>

				{/* FEATURES GRID */}

				<div
					className="
						grid
						grid-cols-1
						md:grid-cols-2
						xl:grid-cols-4
						gap-7
					"
				>
					{features.map((feature, index) => {
						const Icon = feature.icon;

						return (
							<div
								key={index}
								className="
									group
									relative
									overflow-hidden
									rounded-[32px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-2xl
									p-8
									transition-all duration-500
									hover:-translate-y-3
									hover:border-orange-500/40

									before:absolute
									before:inset-0
									before:rounded-[32px]
									before:bg-orange-500/0
									before:blur-3xl
									before:transition-all
									before:duration-500
									group-hover:before:bg-orange-500/10

									hover:shadow-[0_0_80px_rgba(249,115,22,0.16)]
								"
							>
								{/* ICON */}

								<div
									className="
										relative
										w-16
										h-16
										rounded-2xl
										bg-orange-500/10
										border border-orange-500/20
										flex items-center justify-center
										text-orange-500
										mb-8
										group-hover:scale-110
										transition-transform duration-500
									"
								>
									<Icon className="w-8 h-8" />
								</div>

								{/* CONTENT */}

								<div className="relative">
									<h3
										className="
											text-2xl
											font-black
											text-white
											tracking-tight
											mb-4
										"
									>
										{feature.title}
									</h3>

									<p
										className="
											text-gray-400
											leading-relaxed
											text-base
										"
									>
										{feature.description}
									</p>
								</div>

								{/* HOVER LINE */}

								<div
									className="
										absolute
										bottom-0
										left-0
										h-[3px]
										w-0
										bg-orange-500
										group-hover:w-full
										transition-all duration-500
									"
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
