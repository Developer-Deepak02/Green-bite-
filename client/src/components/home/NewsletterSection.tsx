"use client";

import { Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
	return (
		<section className="relative py-28 overflow-hidden">
			{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-1/2
					left-1/2
					-translate-x-1/2
					-translate-y-1/2
					w-[700px]
					h-[700px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			<div
				className="
					relative
					z-10
					px-4
					md:px-8
					xl:px-12
				"
			>
				<div
					className="
						max-w-5xl
						mx-auto
						rounded-[40px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-8
						md:p-14
						text-center
						overflow-hidden
						relative
					"
				>
					{/* INNER GLOW */}

					<div
						className="
							absolute
							top-1/2
							left-1/2
							-translate-x-1/2
							-translate-y-1/2
							w-[500px]
							h-[500px]
							bg-orange-500/10
							blur-[140px]
							rounded-full
							pointer-events-none
						"
					/>

					<div className="relative z-10">
						{/* ICON */}

						<div
							className="
								w-20 h-20
								mx-auto
								mb-8
								rounded-3xl
								bg-orange-500/10
								border border-orange-500/20
								flex items-center justify-center
							"
						>
							<Mail className="w-10 h-10 text-orange-500" />
						</div>

						{/* HEADING */}

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
							Get Exclusive
							<span className="text-orange-500"> Food Offers</span>
						</h2>

						<p
							className="
								mt-6
								text-lg
								text-gray-400
								max-w-2xl
								mx-auto
								leading-relaxed
							"
						>
							Subscribe to receive premium deals, special discounts, new menu
							launches and exclusive combo offers directly in your inbox.
						</p>

						{/* FORM */}

						<div
							className="
								mt-10
								flex
								flex-col
								md:flex-row
								gap-4
								max-w-2xl
								mx-auto
							"
						>
							<Input
								type="email"
								placeholder="Enter your email address"
								className="
									h-14
									rounded-2xl
									bg-white/[0.04]
									border-white/10
									text-white
									placeholder:text-gray-500
									focus-visible:ring-orange-500
								"
							/>

							<Button
								className="
									h-14
									px-8
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
									shadow-xl
									shadow-orange-500/20
									transition-all duration-300
								"
							>
								Subscribe
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</div>

						{/* SMALL TEXT */}

						<p
							className="
								mt-5
								text-sm
								text-gray-500
							"
						>
							No spam. Only delicious updates and premium offers.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
