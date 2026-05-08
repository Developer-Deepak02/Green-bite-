"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { MenuItem, Category } from "@/types";
import { useCartStore } from "@/store/useCartStore";

export default function MenuPage() {
	const [menu, setMenu] = useState<MenuItem[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(true);

	const addToCart = useCartStore((state) => state.addToCart);

	// Load categories
	useEffect(() => {
		api.getCategories().then(setCategories).catch(console.error);
	}, []);

	// Fetch menu (with debounce)
	useEffect(() => {
		const delay = setTimeout(() => {
			const fetchMenu = async () => {
				try {
					setLoading(true);

					let query = "?";
					if (search) query += `search=${search}&`;
					if (selectedCategory) query += `category=${selectedCategory}`;

					const data = await api.getMenu(query);
					setMenu(Array.isArray(data) ? data : []);
				} catch (err) {
					console.error(err);
					setMenu([]);
				} finally {
					setLoading(false);
				}
			};

			fetchMenu();
		}, 400); // debounce

		return () => clearTimeout(delay);
	}, [search, selectedCategory]);

	return (
		<div className="min-h-screen px-4 py-6 bg-background dark:bg-gray-900">
			{/* Header */}
			<h1 className="text-3xl font-heading mb-6 text-text dark:text-white">
				🍽 Menu
			</h1>

			<Link href="/cart" className="text-primary font-medium">
				Go to Cart →
			</Link>

			{/* Search */}
			<input
				type="text"
				placeholder="Search for food..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full mt-4 mb-5 px-4 py-2 rounded-xl border 
        bg-white dark:bg-gray-800 
        border-gray-300 dark:border-gray-700 
        focus:outline-none focus:ring-2 focus:ring-primary"
			/>

			{/* Categories */}
			<div className="flex gap-2 overflow-x-auto mb-6">
				<button
					onClick={() => setSelectedCategory("")}
					className={`px-4 py-1 rounded-full text-sm font-medium transition
            ${
							selectedCategory === ""
								? "bg-primary text-white"
								: "bg-gray-100 dark:bg-gray-800"
						}`}
				>
					All
				</button>

				{categories.map((cat) => (
					<button
						key={cat._id}
						onClick={() => setSelectedCategory(cat._id)}
						className={`px-4 py-1 rounded-full text-sm font-medium transition
              ${
								selectedCategory === cat._id
									? "bg-primary text-white"
									: "bg-gray-100 dark:bg-gray-800"
							}`}
					>
						{cat.name}
					</button>
				))}
			</div>

			{/* Loading */}
			{loading ? (
				<p className="text-gray-500">Loading menu...</p>
			) : menu.length === 0 ? (
				<p className="text-gray-500">No items found</p>
			) : (
				/* Menu Grid */
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					{menu.map((item) => (
						<div
							key={item._id}
							className="group overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
						>
							{/* Food Image */}
							<div className="relative h-40 overflow-hidden">
								<img
									src={
										item.image && item.image.trim() !== ""
											? item.image
											: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
									}
									alt={item.name}
									onError={(e) => {
										e.currentTarget.src =
											"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop";
									}}
									className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
								/>

								{/* Rating */}
								<div
									className="absolute top-3 left-3 
				bg-white/90 dark:bg-black/70 backdrop-blur-sm
				px-3 py-1 rounded-full text-sm font-semibold"
								>
									⭐ {item.ratingAverage?.toFixed(1) || "0.0"}
								</div>

								{/* Availability */}
								<div
									className={`absolute top-3 right-3 
				px-3 py-1 rounded-full text-xs font-semibold text-white
				${item.isAvailable ? "bg-green-600" : "bg-red-500"}`}
								>
									{item.isAvailable ? "Available" : "Unavailable"}
								</div>
							</div>

							{/* Content */}
							<div className="p-3">
								<div className="flex justify-between items-start gap-3">
									<div>
										<h2 className="text-base font-heading text-gray-900 dark:text-white">
											{item.name}
										</h2>

										<p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
											{item.description}
										</p>
									</div>

									<div className="text-primary font-bold text-base whitespace-nowrap">
										₹{item.price}
									</div>
								</div>

								{/* Prep Time */}
								<div className="mt-2 text-sm text-gray-500">
									⏱ {item.preparationTime || 15} mins
								</div>

								{/* Add Button */}
								<button
									disabled={!item.isAvailable}
									onClick={() =>
										addToCart({
											_id: item._id,
											name: item.name,
											price: item.price,
											quantity: 1,
										})
									}
									className={`mt-3 w-full py-1.5 rounded-lg text-sm font-medium transition
				${
					item.isAvailable
						? "bg-primary hover:bg-primary-dark text-white"
						: "bg-gray-300 cursor-not-allowed text-gray-500"
				}`}
								>
									{item.isAvailable ? "Add to Cart" : "Unavailable"}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
