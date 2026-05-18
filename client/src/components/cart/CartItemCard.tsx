"use client";

import Image from "next/image";

import { Clock3, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CartItem, useCartStore } from "@/store/useCartStore";

interface CartItemCardProps {
	item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
	const increaseQty = useCartStore((state) => state.increaseQty);

	const decreaseQty = useCartStore((state) => state.decreaseQty);

	const removeFromCart = useCartStore((state) => state.removeFromCart);

	const subtotal = item.price * item.quantity;

	return (
		<div
			className="
				group
				relative
				overflow-hidden
				rounded-[32px]
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-2xl
				transition-all duration-300
				hover:border-orange-500/30
			"
		>
			<div
				className="
					flex
					flex-col
					md:flex-row
				"
			>
				{/* IMAGE */}

				<div
					className="
						relative
						w-full
						md:w-[280px]
						h-[240px]
						md:h-auto
						flex-shrink-0
						overflow-hidden
					"
				>
					<Image
						src={
							item.image?.startsWith("http")
								? item.image
								: "/placeholder-food.jpg"
						}
						alt={item.name}
						fill
						className="
							object-cover
							group-hover:scale-105
							transition-transform duration-700
						"
					/>

					<div
						className="
							absolute inset-0
							bg-gradient-to-t
							from-black/70
							via-black/10
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
						{item.category || "Featured"}
					</div>
				</div>

				{/* CONTENT */}

				<div
					className="
						flex-1
						p-6
						md:p-8
						flex
						flex-col
						justify-between
						gap-6
					"
				>
					{/* TOP */}

					<div className="space-y-5">
						<div
							className="
								flex
								items-start
								justify-between
								gap-4
							"
						>
							<div className="space-y-3">
								<h2
									className="
										text-3xl
										font-black
										text-white
										leading-tight
									"
								>
									{item.name}
								</h2>

								<div
									className="
										flex
										items-center
										gap-2
										text-sm
										text-gray-400
									"
								>
									<Clock3 className="w-4 h-4" />
									{item.preparationTime || 20} min prep
								</div>
							</div>

							<Button
								size="icon"
								variant="ghost"
								onClick={() => removeFromCart(item._id)}
								className="
									w-11
									h-11
									rounded-2xl
									text-gray-400
									hover:bg-red-500/10
									hover:text-red-400
								"
							>
								<Trash2 className="w-5 h-5" />
							</Button>
						</div>

						{/* PRICE */}

						<div className="space-y-1">
							<p className="text-sm text-gray-500">Price</p>

							<h3
								className="
									text-4xl
									font-black
									text-white
								"
							>
								₹{item.price}
							</h3>
						</div>
					</div>

					{/* BOTTOM */}

					<div
						className="
							flex
							flex-col
							sm:flex-row
							sm:items-end
							sm:justify-between
							gap-5
						"
					>
						{/* QUANTITY */}

						<div className="space-y-3">
							<p className="text-sm text-gray-500">Quantity</p>

							<div
								className="
									inline-flex
									items-center
									gap-4
									bg-white/[0.03]
									border border-white/10
									rounded-2xl
									p-2
								"
							>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => decreaseQty(item._id)}
									className="
										w-10
										h-10
										rounded-xl
										text-gray-300
										hover:bg-white/[0.06]
									"
								>
									<Minus className="w-4 h-4" />
								</Button>

								<span
									className="
										min-w-[20px]
										text-center
										font-bold
										text-white
									"
								>
									{item.quantity}
								</span>

								<Button
									size="icon"
									variant="ghost"
									onClick={() => increaseQty(item._id)}
									className="
										w-10
										h-10
										rounded-xl
										text-gray-300
										hover:bg-orange-500
										hover:text-white
									"
								>
									<Plus className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* SUBTOTAL */}

						<div className="sm:text-right">
							<p className="text-sm text-gray-500 mb-1">Subtotal</p>

							<h3
								className="
									text-4xl
									font-black
									text-orange-500
								"
							>
								₹{subtotal}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
