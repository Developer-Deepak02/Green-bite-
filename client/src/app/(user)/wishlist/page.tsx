"use client";

import { useEffect } from "react";

import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { Heart, ShoppingCart, Trash2, Star, Clock3 } from "lucide-react";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export default function WishlistPage() {
	const { items, loading, fetchWishlist, removeFromWishlist } =
		useWishlistStore();

	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		fetchWishlist();
	}, [fetchWishlist]);

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-[#020817] text-white">
				<Navbar />

				{/* BG */}

				<div
					className="
						absolute
						top-0
						left-1/2
						-translate-x-1/2
						w-[900px]
						h-[500px]
						bg-red-500/10
						blur-[180px]
						rounded-full
						pointer-events-none
					"
				/>

				<div className="relative z-10 px-4 md:px-6 py-10">
					<div className="max-w-7xl mx-auto">
						{/* HEADER */}

						<div className="mb-12">
							<div
								className="
									inline-flex
									items-center
									gap-2
									px-4 py-2
									rounded-full
									bg-red-500/10
									border border-red-500/20
									text-red-400
									text-sm
									font-medium
									mb-5
								"
							>
								<Heart className="w-4 h-4 fill-red-400" />
								My Wishlist
							</div>

							<h1
								className="
									text-4xl
									md:text-5xl
									font-black
									tracking-tight
								"
							>
								Saved
								<span className="text-red-500"> Favorites</span>
							</h1>

							<p className="text-gray-400 mt-4 text-lg">
								Your favorite dishes saved for later.
							</p>
						</div>

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
								{[1, 2, 3, 4].map((item) => (
									<div
										key={item}
										className="
											h-[420px]
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
									py-28
									rounded-[36px]
									bg-white/[0.03]
									border border-white/10
								"
							>
								<div
									className="
										w-24
										h-24
										mx-auto
										rounded-3xl
										bg-red-500/10
										border border-red-500/20
										flex items-center justify-center
										mb-8
									"
								>
									<Heart className="w-10 h-10 text-red-400" />
								</div>

								<h2 className="text-3xl font-bold">Your Wishlist Is Empty</h2>

								<p className="text-gray-400 mt-4 max-w-md mx-auto">
									Save your favorite dishes to quickly access them later.
								</p>

								<Link
									href="/menu"
									className="
										inline-flex
										items-center
										justify-center
										mt-8
										h-12
										px-6
										rounded-2xl
										bg-orange-500
										hover:bg-orange-600
										font-semibold
									"
								>
									Explore Menu
								</Link>
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
									<div
										key={item._id}
										className="
											group
											overflow-hidden
											rounded-[32px]
											bg-white/[0.03]
											border border-white/10
											backdrop-blur-xl
											hover:border-red-500/20
											transition-all duration-300
										"
									>
										{/* IMAGE */}

										<Link href={`/menu/${item._id}`}>
											<div className="relative h-64 overflow-hidden">
												<img
													src={item.image || "/placeholder-food.jpg"}
													alt={item.name}
													className="
														w-full
														h-full
														object-cover
														group-hover:scale-105
														transition-transform duration-700
													"
												/>

												<div
													className="
														absolute inset-0
														bg-gradient-to-t
														from-black/80
														to-transparent
													"
												/>
											</div>
										</Link>

										{/* CONTENT */}

										<div className="p-5">
											<div className="flex items-start justify-between gap-4">
												<div>
													<h3 className="text-2xl font-bold">{item.name}</h3>

													<p className="text-gray-400 text-sm mt-2">
														{item.category?.name}
													</p>
												</div>

												<button
													onClick={() => removeFromWishlist(item._id)}
													className="
														w-10
														h-10
														rounded-2xl
														bg-red-500/10
														border border-red-500/20
														text-red-400
														flex items-center justify-center
													"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>

											{/* META */}

											<div className="flex items-center gap-4 mt-5">
												<div className="flex items-center gap-1 text-sm">
													<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

													<span>{item.ratingAverage?.toFixed(1) || "4.5"}</span>
												</div>

												<div className="flex items-center gap-1 text-sm text-gray-400">
													<Clock3 className="w-4 h-4" />
													{item.preparationTime || 20}
													min
												</div>
											</div>

											{/* FOOTER */}

											<div className="flex items-end justify-between mt-6">
												<div>
													<p className="text-3xl font-black">₹{item.price}</p>
												</div>

												<button
													onClick={() =>
														addToCart({
															_id: item._id,
															name: item.name,
															price: item.price,
															image: item.image,
															quantity: 1,
														})
													}
													className="
														w-12
														h-12
														rounded-2xl
														bg-orange-500
														hover:bg-orange-600
														text-white
														flex items-center justify-center
													"
												>
													<ShoppingCart className="w-5 h-5" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<Footer />
			</div>
		</ProtectedRoute>
	);
}
