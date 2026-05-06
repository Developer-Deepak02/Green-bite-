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
							className="bg-white dark:bg-gray-800 
              rounded-2xl p-4 shadow-sm hover:shadow-md transition"
						>
							<h2 className="text-lg font-heading mb-1 dark:text-white">
								{item.name}
							</h2>

							<p className="text-sm text-gray-500 dark:text-gray-400">
								{item.description}
							</p>

							<div className="mt-3 flex justify-between items-center">
								<span className="text-primary font-semibold text-lg">
									₹{item.price}
								</span>

								<button
									onClick={() =>
										addToCart({
											_id: item._id,
											name: item.name,
											price: item.price,
											quantity: 1,
										})
									}
									className="bg-primary hover:bg-primary-dark 
                  text-white px-3 py-1 rounded-lg text-sm transition"
								>
									Add
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
