"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Plus, Star, Clock3, ArrowRight } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";

interface Product {
	_id: string;

	name: string;

	price: number;

	image: string;

	description: string;

	preparationTime: number;

	ratingAverage: number;

	category?: {
		_id: string;

		name: string;
	};
}

interface Props {
	categoryId?: string;

	currentItemId: string;
}

export default function RelatedProducts({ categoryId, currentItemId }: Props) {
	const [items, setItems] = useState<Product[]>([]);

	const [loading, setLoading] = useState(true);

	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		const fetchRelated = async () => {
			try {
				if (!categoryId) return;

				const res = await fetch(
					`http://localhost:5000/api/menu?category=${categoryId}&limit=8`,
				);

				const data = await res.json();

				const filtered =
					data.items?.filter((item: Product) => item._id !== currentItemId) ||
					[];

				setItems(filtered);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchRelated();
	}, [categoryId, currentItemId]);

	if (loading || items.length === 0) {
		return null;
	}

	return (
		<section className="mt-28">
			{/* HEADER */}

			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="text-3xl font-bold text-white">Related Dishes</h2>

					<p className="text-gray-400 mt-2">
						You may also like these delicious picks
					</p>
				</div>

				<Link
					href="/menu"
					className="
						hidden md:flex
						items-center gap-2
						text-orange-400
						font-medium
						hover:text-orange-300
					"
				>
					View All
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>

			{/* CARDS */}

			<div
				className="
					grid
					grid-cols-1
					sm:grid-cols-2
					xl:grid-cols-4
					gap-6
				"
			>
				{items.slice(0, 4).map((item) => (
					<div
						key={item._id}
						className="
							group
							overflow-hidden
							rounded-[30px]
							bg-white/[0.03]
							border border-white/10
							backdrop-blur-xl
							hover:border-orange-500/20
							transition-all duration-300
						"
					>
						{/* IMAGE */}

						<Link href={`/menu/${item._id}`}>
							<div className="relative h-56 overflow-hidden">
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
										via-transparent
										to-transparent
									"
								/>
							</div>
						</Link>

						{/* CONTENT */}

						<div className="p-5">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="text-xl font-bold text-white">{item.name}</h3>

									<p className="text-gray-400 text-sm mt-2 line-clamp-2">
										{item.description}
									</p>
								</div>

								<div
									className="
										flex items-center gap-1
										text-sm
										bg-white/[0.03]
										border border-white/10
										rounded-full
										px-2 py-1
									"
								>
									<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

									<span className="text-white">
										{item.ratingAverage?.toFixed(1) || "4.5"}
									</span>
								</div>
							</div>

							{/* FOOTER */}

							<div className="flex items-end justify-between mt-6">
								<div>
									<p className="text-2xl font-black text-white">
										₹{item.price}
									</p>

									<div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
										<Clock3 className="w-4 h-4" />
										{item.preparationTime || 20} mins
									</div>
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
										w-12 h-12
										rounded-2xl
										bg-orange-500
										hover:bg-orange-600
										text-white
										flex items-center justify-center
										shadow-lg shadow-orange-500/20
									"
								>
									<Plus className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
