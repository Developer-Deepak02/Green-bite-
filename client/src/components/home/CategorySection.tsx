"use client";

import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { api } from "@/lib/api";
import { Category } from "@/types";

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
				left: -300,
				behavior: "smooth",
			});
		}
	};

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: 300,
				behavior: "smooth",
			});
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
		<section className="relative py-20 overflow-hidden bg-[#0B1220]">
			{/* Premium Glow */}
			<div
				className="
					absolute
					top-1/2
					left-1/2
					-translate-x-1/2
					-translate-y-1/2
					w-[600px]
					h-[600px]
					bg-orange-500/10
					blur-[160px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="max-w-7xl mx-auto px-4 relative z-10">
				{/* Header */}
				<div className="flex items-end justify-between mb-10">
					<div>
						<p className="text-orange-500 font-medium mb-2">
							Explore Categories
						</p>

						<h2
							className="
								text-3xl
								md:text-4xl
								font-black
								text-white
							"
						>
							Popular Categories
						</h2>
					</div>

					<button
						className="
							hidden md:flex
							items-center gap-1
							text-sm
							text-gray-400
							hover:text-orange-500
							transition-colors duration-300
						"
					>
						View All
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>

				{/* Loading State */}
				{loading ? (
					<div className="flex gap-5 overflow-hidden">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="
									min-w-[220px]
									md:min-w-[240px]
									h-[260px]
									bg-white/5
									border border-white/10
									rounded-3xl
									animate-pulse
								"
							/>
						))}
					</div>
				) : categories.length === 0 ? (
					<div
						className="
							text-center
							py-16
							text-gray-400
						"
					>
						No categories found
					</div>
				) : (
					<div className="relative">
						{/* Categories */}
						<div
							ref={sliderRef}
							className="
								flex gap-5
								overflow-x-auto
								scroll-smooth
								pb-4
								pr-4
								[&::-webkit-scrollbar]:hidden
								[-ms-overflow-style:none]
								[scrollbar-width:none]
							"
						>
							{categories.map((category) => (
								<div
									key={category._id}
									className="
										group
										min-w-[220px]
										md:min-w-[240px]
										bg-white/[0.04]
										border border-white/10
										backdrop-blur-xl
										rounded-3xl
										overflow-hidden
										cursor-pointer
										hover:border-orange-500
										hover:shadow-[0_0_25px_rgba(249,115,22,0.18)]
										hover:-translate-y-1
										transition-all duration-300
									"
								>
									{/* Image */}
									<div className="relative h-44 overflow-hidden">
										<Image
											src={getCategoryImage(category.name)}
											alt={category.name}
											fill
											className="
												object-cover
												group-hover:scale-110
												transition-transform
												duration-500
											"
										/>

										<div
											className="
												absolute inset-0
												bg-gradient-to-t
												from-black/80
												via-black/20
												to-transparent
											"
										/>
									</div>

									{/* Content */}
									<div className="p-5">
										<h3
											className="
												text-xl
												font-bold
												text-white
												mb-1
											"
										>
											{category.name}
										</h3>

										<p className="text-sm text-gray-400">Fresh & Delicious</p>
									</div>
								</div>
							))}
						</div>

						{/* Navigation Buttons */}
						<div
							className="
								hidden md:flex
								items-center gap-3
								justify-end
								mt-6
							"
						>
							<button
								onClick={scrollLeft}
								className="
									w-11 h-11
									rounded-full
									bg-white/5
									border border-white/10
									flex items-center justify-center
									text-gray-300
									hover:bg-orange-500
									hover:border-orange-500
									hover:text-white
									transition-all duration-300
								"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>

							<button
								onClick={scrollRight}
								className="
									w-11 h-11
									rounded-full
									bg-white/5
									border border-white/10
									flex items-center justify-center
									text-gray-300
									hover:bg-orange-500
									hover:border-orange-500
									hover:text-white
									transition-all duration-300
								"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>

						{/* Slider Indicator */}
						<div className="flex justify-center mt-5 gap-2">
							<div className="w-10 h-1 rounded-full bg-orange-500" />

							<div className="w-4 h-1 rounded-full bg-white/20" />

							<div className="w-4 h-1 rounded-full bg-white/20" />
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
