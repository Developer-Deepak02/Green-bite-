"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ReviewSection from "@/components/reviews/ReviewSection";
import { useCartStore } from "@/store/useCartStore";
import { Star, Clock3, Minus, Plus, ShoppingCart, Check } from "lucide-react";

interface MenuItem {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	preparationTime: number;
	ratingAverage: number;
	ratingCount: number;
	category?: {
		name: string;
	};
	isAvailable: boolean;
}

export default function ProductPage() {
	const params = useParams();

	const { addToCart } = useCartStore();

	const [item, setItem] = useState<MenuItem | null>(null);

	const [loading, setLoading] = useState(true);

	const [quantity, setQuantity] = useState(1);

	const [added, setAdded] = useState(false);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const res = await fetch(`http://localhost:5000/api/menu/${params.id}`);

				const data = await res.json();

				setItem(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchItem();
		}
	}, [params.id]);

	const increaseQty = () => {
		setQuantity((prev) => prev + 1);
	};

	const decreaseQty = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleAddToCart = () => {
		if (!item) return;

		addToCart({
			_id: item._id,
			name: item.name,
			price: item.price,
			image: item.image,
			quantity,
		});

		setAdded(true);

		setTimeout(() => {
			setAdded(false);
		}, 2000);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817]">
				<Navbar />

				<div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
					<div className="grid lg:grid-cols-2 gap-10 animate-pulse">
						<div className="aspect-square rounded-[32px] bg-white/5" />

						<div className="space-y-5">
							<div className="h-8 w-40 rounded bg-white/5" />

							<div className="h-14 w-96 rounded bg-white/5" />

							<div className="h-28 w-full rounded bg-white/5" />

							<div className="h-20 w-full rounded bg-white/5" />

							<div className="h-14 w-full rounded-2xl bg-white/5" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
				Product not found
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			<Navbar />

			{/* BACKGROUND */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10">
				<div className="grid lg:grid-cols-2 gap-10 items-start">
					{/* IMAGE */}

					<div
						className="
							relative
							group
							overflow-hidden
							rounded-[36px]
							border border-white/10
							bg-white/[0.03]
						"
					>
						<div className="aspect-square relative overflow-hidden">
							<Image
								src={item.image || "/placeholder-food.jpg"}
								alt={item.name}
								fill
								className="
									object-cover
									group-hover:scale-105
									transition-transform
									duration-700
								"
							/>
						</div>
					</div>

					{/* CONTENT */}

					<div className="space-y-6">
						{/* CATEGORY */}

						<div
							className="
								inline-flex
								items-center
								px-4 py-2
								rounded-full
								bg-orange-500/10
								border border-orange-500/20
								text-orange-400
								text-sm
								font-medium
							"
						>
							{item.category?.name || "Food Item"}
						</div>

						{/* TITLE */}

						<div>
							<h1
								className="
									text-4xl
									md:text-5xl
									font-black
									leading-tight
									tracking-tight
								"
							>
								{item.name}
							</h1>

							<p className="text-gray-400 mt-5 leading-relaxed text-lg">
								{item.description}
							</p>
						</div>

						{/* META */}

						<div className="flex flex-wrap items-center gap-4">
							<div
								className="
									flex items-center gap-2
									px-4 py-2
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
								"
							>
								<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

								<span className="font-semibold">
									{item.ratingAverage?.toFixed(1) || "4.5"}
								</span>

								<span className="text-gray-500 text-sm">
									({item.ratingCount || 0})
								</span>
							</div>

							<div
								className="
									flex items-center gap-2
									px-4 py-2
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
								"
							>
								<Clock3 className="w-4 h-4 text-orange-400" />

								<span className="text-sm text-gray-300">
									{item.preparationTime} mins
								</span>
							</div>

							<div
								className={`
									px-4 py-2
									rounded-2xl
									border
									text-sm font-medium
									${
										item.isAvailable
											? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
											: "bg-red-500/10 border-red-500/20 text-red-400"
									}
								`}
							>
								{item.isAvailable ? "Available" : "Unavailable"}
							</div>
						</div>

						{/* PRICE */}

						<div className="pt-2">
							<h2 className="text-5xl font-black text-orange-500">
								₹{item.price}
							</h2>
						</div>

						{/* QUANTITY */}

						<div
							className="
								flex items-center gap-4
								pt-4
							"
						>
							<div
								className="
									flex items-center
									bg-white/[0.03]
									border border-white/10
									rounded-2xl
									p-2
								"
							>
								<button
									onClick={decreaseQty}
									className="
										w-11 h-11
										rounded-xl
										bg-white/[0.05]
										hover:bg-white/[0.08]
										flex items-center justify-center
									"
								>
									<Minus className="w-4 h-4" />
								</button>

								<div className="w-14 text-center font-bold text-lg">
									{quantity}
								</div>

								<button
									onClick={increaseQty}
									className="
										w-11 h-11
										rounded-xl
										bg-orange-500
										hover:bg-orange-600
										flex items-center justify-center
									"
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* BUTTON */}

						<button
							onClick={handleAddToCart}
							disabled={!item.isAvailable}
							className={`
								w-full
								h-16
								rounded-3xl
								font-semibold
								text-lg
								transition-all
								duration-300
								flex items-center justify-center gap-3
								${
									item.isAvailable
										? `
											bg-orange-500
											hover:bg-orange-600
											shadow-2xl
											shadow-orange-500/20
										`
										: `
											bg-white/10
											cursor-not-allowed
											text-gray-500
										`
								}
							`}
						>
							{added ? (
								<>
									<Check className="w-5 h-5" />
									Added To Cart
								</>
							) : (
								<>
									<ShoppingCart className="w-5 h-5" />
									Add To Cart
								</>
							)}
						</button>
					</div>
				</div>
			</div>
			<ReviewSection menuItemId={item._id} />
			<Footer />
		</div>
	);
}
