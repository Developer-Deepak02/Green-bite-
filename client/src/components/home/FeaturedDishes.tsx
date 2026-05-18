"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Clock3, Plus, Star, Flame, ArrowRight } from "lucide-react";

import { api } from "@/lib/api";
import { MenuItem } from "@/types";

import { useCartStore } from "@/store/useCartStore";

import { Button } from "@/components/ui/button";

export default function FeaturedDishes() {
	const [items, setItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	const { items: cartItems, addToCart } = useCartStore();

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await api.get("/menu");

				setItems(response.data.items || []);
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenu();
	}, []);

	const getCartItem = (id: string) => {
		return cartItems.find((item) => item._id === id);
	};

	const handleAddToCart = (item: MenuItem) => {
		addToCart({
			_id: item._id,
			name: item.name,
			price: item.price,
			quantity: 1,
		});
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
					inset-0
					bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_28%)]
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
							Chef Recommendations
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
								Featured
								<span className="text-orange-500"> Dishes</span>
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
								Handpicked chef specials crafted with premium ingredients, bold
								flavors, and unforgettable taste experiences.
							</p>
						</div>
					</div>

					<Link href="/menu">
						<Button
							variant="ghost"
							className="
								hidden lg:flex
								items-center gap-2
								h-12
								px-5
								rounded-2xl
								text-gray-400
								hover:text-orange-500
								hover:bg-white/[0.03]
								absolute
								right-0
								top-1/2
								-translate-y-1/2
							"
						>
							View Full Menu
							<ArrowRight className="w-4 h-4" />
						</Button>
					</Link>
				</div>

				{/* LOADING */}

				{loading ? (
					<div
						className="
							grid
							grid-cols-1
							sm:grid-cols-2
							xl:grid-cols-4
							gap-7
						"
					>
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="
									h-[430px]
									rounded-[36px]
									bg-white/[0.03]
									border border-white/10
									animate-pulse
								"
							/>
						))}
					</div>
				) : items.length === 0 ? (
					<div
						className="
							text-center
							py-24
							text-gray-400
						"
					>
						No dishes available
					</div>
				) : (
					<div
						className="
							grid
							grid-cols-1
							sm:grid-cols-2
							xl:grid-cols-4
							gap-7
						"
					>
						{items.slice(0, 8).map((item) => (
							<div
								key={item._id}
								className="
									group
									relative
									overflow-hidden
									rounded-[36px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-2xl
									transition-all duration-500
									hover:-translate-y-3
									hover:border-orange-500/40

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

								<div className="relative h-64 overflow-hidden">
									<Image
										src={
											item.image &&
											item.image.startsWith("http") &&
											!item.image.includes("...")
												? item.image
												: "/placeholder-food.jpg"
										}
										alt={item.name}
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
											via-black/25
											to-transparent
										"
									/>

									{/* RATING */}

									<div
										className="
											absolute
											top-5
											left-5
											bg-black/50
											backdrop-blur-xl
											border border-white/10
											px-3 py-1.5
											rounded-full
											flex items-center gap-1.5
											text-sm
											font-semibold
											text-white
										"
									>
										<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

										{item.ratingAverage?.toFixed(1) || "4.5"}
									</div>

									{/* POPULAR */}

									<div
										className="
											absolute
											top-5
											right-5
											bg-orange-500
											text-white
											text-xs
											font-semibold
											px-3 py-1.5
											rounded-full
											flex items-center gap-1
											shadow-lg shadow-orange-500/30
										"
									>
										<Flame className="w-3 h-3" />
										Popular
									</div>
								</div>

								{/* CONTENT */}

								<div className="relative p-6">
									{/* CATEGORY */}

									<div
										className="
											inline-flex
											items-center
											bg-orange-500/10
											border border-orange-500/20
											text-orange-400
											text-xs
											font-medium
											px-3 py-1.5
											rounded-full
											mb-4
										"
									>
										{item.category?.name || "Featured"}
									</div>

									{/* TITLE */}

									<h3
										className="
											text-2xl
											font-black
											text-white
											tracking-tight
											line-clamp-1
										"
									>
										{item.name}
									</h3>

									{/* DESCRIPTION */}

									<p
										className="
											mt-3
											text-gray-400
											text-sm
											leading-relaxed
											line-clamp-2
											min-h-[44px]
										"
									>
										{item.description}
									</p>

									{/* BOTTOM */}

									<div
										className="
											flex
											items-end
											justify-between
											mt-7
										"
									>
										<div className="space-y-2">
											<p
												className="
													text-3xl
													font-black
													text-white
												"
											>
												₹{item.price}
											</p>

											<div
												className="
													flex
													items-center
													gap-1.5
													text-gray-400
													text-sm
												"
											>
												<Clock3 className="w-4 h-4" />
												{item.preparationTime || 20} min
											</div>
										</div>

										{/* CART BUTTON */}

										{getCartItem(item._id) ? (
											<Link href="/cart">
												<Button
													className="
														h-14
														px-6
														rounded-2xl
														bg-green-500
														hover:bg-green-600
														text-white
														font-semibold
														shadow-xl
														shadow-green-500/20
														transition-all
														duration-300
													"
												>
													Go To Cart
												</Button>
											</Link>
										) : (
											<Button
												size="icon"
												disabled={item.isAvailable === false}
												onClick={() => handleAddToCart(item)}
												className="
													w-14
													h-14
													rounded-2xl
													bg-orange-500
													hover:bg-orange-600
													text-white
													shadow-xl
													shadow-orange-500/25
													transition-all
													duration-300
													group-hover:scale-105
												"
											>
												<Plus className="w-6 h-6" />
											</Button>
										)}
									</div>
								</div>

								{/* UNAVAILABLE */}

								{item.isAvailable === false && (
									<div
										className="
											absolute inset-0
											bg-black/70
											backdrop-blur-md
											flex items-center justify-center
										"
									>
										<div
											className="
												bg-red-500
												text-white
												px-5 py-2.5
												rounded-full
												font-semibold
												shadow-lg
											"
										>
											Unavailable
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
