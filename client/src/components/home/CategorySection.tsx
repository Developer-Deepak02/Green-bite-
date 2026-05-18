"use client";

import Link from "next/link";

import Image from "next/image";

import { ChevronRight, ChevronLeft } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { api } from "@/lib/api";

import { Category } from "@/types";

import { Button } from "@/components/ui/button";

const categoryImages: Record<string, string> = {
	pizza:
		"https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",

	burger:
		"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",

	pasta:
		"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",

	dessert:
		"https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",

	drink:
		"https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",

	default:
		"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
};

export default function CategorySection() {
	const sliderRef = useRef<HTMLDivElement>(null);

	const [categories, setCategories] = useState<Category[]>([]);

	const [loading, setLoading] = useState(true);

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get("/categories");

				setCategories(response.data || []);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: -420,

				behavior: "smooth",
			});

			setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
		}
	};

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: 420,

				behavior: "smooth",
			});

			setActiveIndex((prev) =>
				prev < categories.length - 1 ? prev + 1 : prev,
			);
		}
	};

	const getCategoryImage = (name: string) => {
		const lower = name.toLowerCase();

		if (lower.includes("pizza")) return categoryImages.pizza;

		if (lower.includes("burger")) return categoryImages.burger;

		if (lower.includes("pasta")) return categoryImages.pasta;

		if (lower.includes("dessert")) return categoryImages.dessert;

		if (lower.includes("drink")) return categoryImages.drink;

		return categoryImages.default;
	};

	return (
		<section className="relative py-28 overflow-hidden">
			{/* BACKGROUND EFFECTS */}

			<div
				className="
					absolute
					top-1/2
					left-1/2
					-translate-x-1/2
					-translate-y-1/2
					w-[850px]
					h-[850px]
					bg-orange-500/10
					blur-[220px]
					rounded-full
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
					bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_30%)]
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
				{/* SECTION HEADER */}

				<div
					className="
						relative
						flex
						flex-col
						items-center
						justify-center
						text-center
						mb-16
					"
				>
					<div className="space-y-5">
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
							"
						>
							Explore Categories
						</div>

						<div className="space-y-4">
							<h2
								className="
									text-4xl
									md:text-5xl
									lg:text-6xl
									font-black
									text-white
									leading-none
									tracking-tight
								"
							>
								Choose Your
								<span className="text-orange-500"> Favorite Taste</span>
							</h2>

							<p
								className="
									text-gray-400
									text-lg
									max-w-2xl
									leading-relaxed
									mx-auto
								"
							>
								Explore handcrafted dishes prepared fresh with premium
								ingredients and unforgettable flavors.
							</p>
						</div>
					</div>

					{/* VIEW ALL */}

					<Link
						href="/menu"
						className="
							hidden
							lg:block
							absolute
							right-0
							top-1/2
							-translate-y-1/2
						"
					>
						<Button
							variant="ghost"
							className="
								items-center gap-2
								h-12
								px-5
								rounded-2xl
								text-gray-400
								hover:text-orange-500
								hover:bg-white/[0.03]
							"
						>
							View All
							<ChevronRight className="w-4 h-4" />
						</Button>
					</Link>
				</div>

				{/* LOADING */}

				{loading ? (
					<div className="flex gap-7 overflow-hidden">
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="
										min-w-[280px]
										md:min-w-[340px]
										h-[420px]
										rounded-[36px]
										bg-white/[0.03]
										border border-white/10
										animate-pulse
									"
							/>
						))}
					</div>
				) : categories.length === 0 ? (
					<div
						className="
							text-center
							py-24
							text-gray-400
						"
					>
						No categories found
					</div>
				) : (
					<div className="relative">
						{/* SLIDER */}

						<div
							ref={sliderRef}
							className="
								flex
								gap-7
								overflow-x-auto
								scroll-smooth
								pb-8
								pr-4
								[&::-webkit-scrollbar]:hidden
								[-ms-overflow-style:none]
								[scrollbar-width:none]
							"
						>
							{categories.map((category) => (
								<Link
									key={category._id}
									href={`/menu?category=${encodeURIComponent(category.name)}`}
									className="
											group
											relative
											min-w-[280px]
											md:min-w-[340px]
											h-[420px]
											rounded-[36px]
											overflow-hidden
											border border-white/10
											bg-white/[0.03]
											backdrop-blur-2xl
											cursor-pointer
											transition-all duration-500
											hover:-translate-y-3
											hover:border-orange-500/40
											block

											before:absolute
											before:inset-0
											before:rounded-[36px]
											before:bg-orange-500/0
											before:blur-3xl
											before:transition-all
											before:duration-500
											group-hover:before:bg-orange-500/10

											hover:shadow-[0_0_80px_rgba(249,115,22,0.18)]
										"
								>
									{/* IMAGE */}

									<div className="absolute inset-0 overflow-hidden">
										<Image
											src={getCategoryImage(category.name)}
											alt={category.name}
											fill
											className="
													object-cover
													group-hover:scale-110
													transition-transform
													duration-700
												"
										/>

										<div
											className="
													absolute inset-0
													bg-gradient-to-t
													from-black/95
													via-black/35
													to-black/10
												"
										/>
									</div>

									{/* CONTENT */}

									<div
										className="
												relative
												h-full
												p-8
												flex
												flex-col
												justify-between
											"
									>
										<div>
											<div
												className="
														inline-flex
														items-center
														bg-orange-500/15
														border border-orange-500/20
														backdrop-blur-xl
														text-orange-400
														text-xs
														font-medium
														px-3 py-1.5
														rounded-full
													"
											>
												Popular Choice
											</div>
										</div>

										<div className="space-y-4">
											<h3
												className="
														text-4xl
														font-black
														text-white
														tracking-tight
													"
											>
												{category.name}
											</h3>

											<p
												className="
														text-gray-300
														text-base
														leading-relaxed
														max-w-[260px]
													"
											>
												Freshly crafted dishes prepared with bold flavors and
												premium ingredients.
											</p>

											<div
												className="
														inline-flex
														items-center
														gap-2
														h-12
														px-5
														rounded-2xl
														bg-orange-500
														text-white
														font-semibold
														shadow-lg shadow-orange-500/20
														group-hover:bg-orange-600
														transition-all duration-300
													"
											>
												Explore Menu
												<ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>

						{/* CONTROLS */}

						<div
							className="
								hidden md:flex
								items-center
								justify-center
								relative
								mt-10
							"
						>
							{/* INDICATOR */}

							<div className="flex items-center gap-2">
								{categories.map((_, index) => (
									<div
										key={index}
										className={`
											h-1 rounded-full transition-all duration-300
											${activeIndex === index ? "w-12 bg-orange-500" : "w-4 bg-white/15"}
										`}
									/>
								))}
							</div>

							{/* NAVIGATION */}

							<div
								className="
									absolute
									right-0
									flex items-center gap-4
								"
							>
								<Button
									size="icon"
									variant="outline"
									onClick={scrollLeft}
									className="
										w-13 h-13
										rounded-full
										border-white/10
										bg-white/[0.03]
										backdrop-blur-xl
										text-gray-300
										hover:bg-orange-500
										hover:border-orange-500
										hover:text-white
									"
								>
									<ChevronLeft className="w-5 h-5" />
								</Button>

								<Button
									size="icon"
									variant="outline"
									onClick={scrollRight}
									className="
										w-13 h-13
										rounded-full
										border-white/10
										bg-white/[0.03]
										backdrop-blur-xl
										text-gray-300
										hover:bg-orange-500
										hover:border-orange-500
										hover:text-white
									"
								>
									<ChevronRight className="w-5 h-5" />
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
