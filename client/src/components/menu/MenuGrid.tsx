"use client";

import Link from "next/link";

import { useEffect } from "react";

import { Clock3, Plus, Star, Flame, Heart } from "lucide-react";

import { MenuItem } from "@/types";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

import { Button } from "@/components/ui/button";

interface MenuGridProps {
	items: MenuItem[];
	loading: boolean;
}

export default function MenuGrid({ items, loading }: MenuGridProps) {
	const addToCart = useCartStore((state) => state.addToCart);

	const { addToWishlist, removeFromWishlist, isWishlisted, fetchWishlist } =
		useWishlistStore();

	useEffect(() => {
		fetchWishlist();
	}, [fetchWishlist]);

	return (
		<section className="relative pb-20">
			{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-1/3
					left-1/2
					-translate-x-1/2
					w-[800px]
					h-[500px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-10">
				{/* LOADING */}

				{loading ? (
					<div
						className="
							grid
							grid-cols-1
							sm:grid-cols-2
							xl:grid-cols-4
							gap-6
						"
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<div
								key={item}
								className="
									h-[430px]
									rounded-[32px]
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
						No dishes found
					</div>
				) : (
					<div
						className="
							grid
							grid-cols-1
							sm:grid-cols-2
							xl:grid-cols-4
							gap-6
						"
					>
						{items.map((item) => (
							<Link key={item._id} href={`/menu/${item._id}`} className="block">
								<div
									className="
										group
										relative
										overflow-hidden
										rounded-[32px]
										border border-white/10
										bg-white/[0.03]
										backdrop-blur-2xl
										transition-all duration-500
										hover:-translate-y-2
										hover:border-orange-500/30
										hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)]
										cursor-pointer
										h-full
									"
								>
									{/* IMAGE */}

									<div className="relative h-64 overflow-hidden">
										<img
											src={
												item.image?.startsWith("http")
													? item.image
													: "/placeholder-food.jpg"
											}
											alt={item.name}
											className="
												w-full
												h-full
												object-cover
												group-hover:scale-110
												transition-transform duration-700
											"
										/>

										<div
											className="
												absolute inset-0
												bg-gradient-to-t
												from-black/90
												via-black/20
												to-transparent
											"
										/>

										{/* CATEGORY */}

										<div
											className="
												absolute
												top-4
												left-4
												bg-black/50
												backdrop-blur-xl
												border border-white/10
												text-white
												text-xs
												font-medium
												px-3 py-1.5
												rounded-full
											"
										>
											{item.category?.name || "Featured"}
										</div>

										{/* POPULAR */}

										<div
											className="
												absolute
												top-4
												right-4
												bg-orange-500
												text-white
												text-xs
												font-semibold
												px-3 py-1.5
												rounded-full
												flex items-center gap-1
											"
										>
											<Flame className="w-3 h-3" />
											Popular
										</div>

										{/* WISHLIST */}

										<button
											onClick={(e) => {
												e.preventDefault();

												e.stopPropagation();

												if (isWishlisted(item._id)) {
													removeFromWishlist(item._id);
												} else {
													addToWishlist(item._id);
												}
											}}
											className="
												absolute
												bottom-4
												right-4
												w-11
												h-11
												rounded-2xl
												bg-black/50
												backdrop-blur-xl
												border border-white/10
												flex items-center justify-center
												transition-all duration-300
												hover:scale-105
											"
										>
											<Heart
												className={`
													w-5 h-5 transition-all
													${isWishlisted(item._id) ? "fill-red-500 text-red-500" : "text-white"}
												`}
											/>
										</button>
									</div>

									{/* CONTENT */}

									<div className="p-6 space-y-5">
										{/* TITLE */}

										<div className="space-y-3">
											<div
												className="
													flex
													items-start
													justify-between
													gap-3
												"
											>
												<h3
													className="
														text-2xl
														font-black
														text-white
														leading-tight
														line-clamp-1
													"
												>
													{item.name}
												</h3>

												<div
													className="
														flex
														items-center
														gap-1
														bg-white/[0.04]
														border border-white/10
														rounded-full
														px-2 py-1
														text-sm
														text-white
													"
												>
													<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

													{item.ratingAverage?.toFixed(1) || "4.5"}
												</div>
											</div>

											<p
												className="
													text-gray-400
													text-sm
													leading-relaxed
													line-clamp-2
													min-h-[42px]
												"
											>
												{item.description}
											</p>
										</div>

										{/* BOTTOM */}

										<div
											className="
												flex
												items-end
												justify-between
												gap-4
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
														gap-2
														text-sm
														text-gray-500
													"
												>
													<Clock3 className="w-4 h-4" />
													{item.preparationTime || 20} min
												</div>
											</div>

											<Button
												size="icon"
												onClick={(e) => {
													e.preventDefault();

													e.stopPropagation();

													addToCart({
														_id: item._id,
														name: item.name,
														price: item.price,
														quantity: 1,
														image: item.image,
													});
												}}
												className="
													w-14
													h-14
													rounded-2xl
													bg-orange-500
													hover:bg-orange-600
													text-white
													shadow-xl shadow-orange-500/20
												"
											>
												<Plus className="w-5 h-5" />
											</Button>
										</div>
									</div>

									{/* UNAVAILABLE */}

									{item.isAvailable === false && (
										<div
											className="
												absolute inset-0
												bg-black/70
												backdrop-blur-sm
												flex items-center justify-center
											"
										>
											<div
												className="
													bg-red-500
													text-white
													px-5 py-2
													rounded-full
													font-semibold
												"
											>
												Unavailable
											</div>
										</div>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
