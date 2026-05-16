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

	// ================= LOAD CATEGORIES =================

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await api.get("/categories");

				setCategories(res.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCategories();
	}, []);

	// ================= FETCH MENU =================

	useEffect(() => {
		const delay = setTimeout(() => {
			const fetchMenu = async () => {
				try {
					setLoading(true);

					let query = "?";

					if (search) {
						query += `search=${search}&`;
					}

					if (selectedCategory) {
						query += `category=${selectedCategory}`;
					}

					const res = await api.get(`/menu${query}`);

					setMenu(res.data.items || []);
				} catch (error) {
					console.error(error);

					setMenu([]);
				} finally {
					setLoading(false);
				}
			};

			fetchMenu();
		}, 400);

		return () => clearTimeout(delay);
	}, [search, selectedCategory]);

	return (
		<div className="min-h-screen bg-[#F9FAFB] px-4 py-6">
			{/* Header */}

			<div className="mb-6 flex items-center justify-between">
				<h1 className="font-heading text-3xl font-bold text-[#111827]">
					🍽 Menu
				</h1>

				<Link
					href="/cart"
					className="rounded-xl bg-[#22C55E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#16A34A]"
				>
					Cart
				</Link>
			</div>

			{/* Search */}

			<input
				type="text"
				placeholder="Search food..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="mb-5 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 outline-none transition focus:border-[#22C55E]"
			/>

			{/* Categories */}

			<div className="mb-6 flex gap-3 overflow-x-auto pb-1">
				<button
					onClick={() => setSelectedCategory("")}
					className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
						selectedCategory === ""
							? "bg-[#22C55E] text-white"
							: "bg-white text-[#111827] border border-[#E5E7EB]"
					}`}
				>
					All
				</button>

				{categories.map((cat) => (
					<button
						key={cat._id}
						onClick={() => setSelectedCategory(cat._id)}
						className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
							selectedCategory === cat._id
								? "bg-[#22C55E] text-white"
								: "bg-white text-[#111827] border border-[#E5E7EB]"
						}`}
					>
						{cat.name}
					</button>
				))}
			</div>

			{/* Loading */}

			{loading ? (
				<div className="py-10 text-center text-gray-500">Loading menu...</div>
			) : menu.length === 0 ? (
				<div className="py-10 text-center text-gray-500">No items found</div>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{menu.map((item) => (
						<div
							key={item._id}
							className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
						>
							{/* Image */}

							<div className="relative h-52 overflow-hidden">
								<img
									src={
										item.image && item.image.trim() !== ""
											? item.image
											: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
									}
									alt={item.name}
									className="h-full w-full object-cover transition duration-300 hover:scale-105"
								/>

								<div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow">
									⭐ {item.ratingAverage?.toFixed(1) || "0.0"}
								</div>
							</div>

							{/* Content */}

							<div className="p-4">
								<div className="mb-2 flex items-start justify-between gap-3">
									<div>
										<h2 className="font-heading text-lg font-semibold text-[#111827]">
											{item.name}
										</h2>

										<p className="mt-1 line-clamp-2 text-sm text-gray-500">
											{item.description}
										</p>
									</div>

									<div className="text-lg font-bold text-[#22C55E]">
										₹{item.price}
									</div>
								</div>

								<div className="mb-4 text-sm text-gray-500">
									⏱ {item.preparationTime || 15} mins
								</div>

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
									className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
										item.isAvailable
											? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
											: "cursor-not-allowed bg-gray-300 text-gray-500"
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
