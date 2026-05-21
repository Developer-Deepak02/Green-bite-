"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/shared/Navbar";

import Footer from "@/components/shared/Footer";

import {
	Pizza,
	Hamburger,
	CupSoda,
	IceCream,
	Salad,
	Coffee,
	ChevronRight,
	Grid2X2,
} from "lucide-react";

interface Category {
	_id: string;

	name: string;

	isActive: boolean;
}

const categoryIcons: Record<string, any> = {
	pizza: Pizza,

	burger: Hamburger,

	drinks: CupSoda,

	beverages: CupSoda,

	desserts: IceCream,

	salad: Salad,

	coffee: Coffee,
};

const gradients = [
	"from-orange-500 to-red-500",

	"from-yellow-500 to-orange-500",

	"from-pink-500 to-rose-500",

	"from-blue-500 to-cyan-500",

	"from-green-500 to-emerald-500",

	"from-purple-500 to-indigo-500",
];

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([]);

	const [loading, setLoading] = useState(true);

	// ================= FETCH CATEGORIES =================

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/categories");

				const data = await res.json();

				setCategories(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// ================= LOADING =================

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817]">
				<Navbar />

				<div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<div
								key={item}
								className="
									h-[260px]
									rounded-[36px]
									bg-white/[0.03]
									border border-white/10
									animate-pulse
								"
							/>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			<Navbar />

			{/* BACKGROUND */}

			<div
				className="
					absolute
					top-0
					left-1/2
					-translate-x-1/2
					w-[900px]
					h-[500px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-10">
				{/* HERO */}

				<section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-12">
					<div className="max-w-3xl">
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
							<Grid2X2 className="w-4 h-4" />
							Explore Categories
						</div>

						<h1
							className="
								text-5xl
								md:text-6xl
								font-black
								tracking-tight
								leading-tight
							"
						>
							Choose Your
							<span className="text-orange-500"> Favorite Food</span>
						</h1>

						<p className="text-gray-400 text-lg mt-6 leading-relaxed">
							Browse BiteRush food categories and discover delicious meals
							perfect for every craving.
						</p>
					</div>
				</section>

				{/* EMPTY */}

				{categories.length === 0 ? (
					<section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
						<div
							className="
								rounded-[36px]
								border border-white/10
								bg-white/[0.03]
								p-16
								text-center
							"
						>
							<h2 className="text-3xl font-black text-white">
								No Categories Found
							</h2>

							<p className="text-gray-400 mt-4">
								Categories will appear here once added by admin.
							</p>
						</div>
					</section>
				) : (
					<section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{categories.map((category, index) => {
								const lowerName = category.name.toLowerCase();

								const Icon = categoryIcons[lowerName] || Pizza;

								const gradient = gradients[index % gradients.length];

								return (
									<Link
										key={category._id}
										href={`/menu?category=${category._id}`}
										className="
											group
											relative
											overflow-hidden
											rounded-[36px]
											border border-white/10
											bg-white/[0.03]
											backdrop-blur-2xl
											p-8
											min-h-[260px]
											flex flex-col
											justify-between
											transition-all
											duration-500
											hover:border-orange-500/20
											hover:-translate-y-1
										"
									>
										{/* GLOW */}

										<div
											className={`
												absolute
												top-0
												right-0
												w-40
												h-40
												bg-gradient-to-br
												${gradient}
												opacity-10
												blur-3xl
												rounded-full
											`}
										/>

										{/* ICON */}

										<div
											className={`
												w-20 h-20
												rounded-[28px]
												bg-gradient-to-br
												${gradient}
												flex items-center justify-center
												shadow-2xl
												group-hover:scale-110
												transition-all duration-500
											`}
										>
											<Icon className="w-10 h-10 text-white" />
										</div>

										{/* CONTENT */}

										<div className="relative z-10">
											<h2
												className="
													text-3xl
													font-black
													text-white
													tracking-tight
												"
											>
												{category.name}
											</h2>

											<p className="text-gray-400 mt-3 leading-relaxed">
												Explore delicious {category.name.toLowerCase()} items
												crafted fresh by BiteRush chefs.
											</p>

											<div
												className="
													mt-6
													inline-flex
													items-center
													gap-2
													text-orange-400
													font-semibold
													group-hover:gap-3
													transition-all
												"
											>
												Explore Category
												<ChevronRight className="w-4 h-4" />
											</div>
										</div>
									</Link>
								);
							})}
						</div>
					</section>
				)}
			</div>

			<Footer />
		</div>
	);
}
