"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import AppShell from "@/components/shared/AppShell";

import MenuHeader from "@/components/menu/MenuHeader";

import CategoryTabs from "@/components/menu/CategoryTabs";

import MenuGrid from "@/components/menu/MenuGrid";

import { api } from "@/lib/api";

import { MenuItem } from "@/types";

export default function MenuPage() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const categoryFromUrl = searchParams.get("category") || "All";

	const [items, setItems] = useState<MenuItem[]>([]);

	const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

	const [loading, setLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

	const [searchQuery, setSearchQuery] = useState("");

	// ================= FETCH MENU =================

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				setLoading(true);

				const response = await api.get("/menu");

				const menuItems =
					response.data.items || response.data.menuItems || response.data || [];

				setItems(menuItems);
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenu();
	}, []);

	// ================= URL CATEGORY SYNC =================

	useEffect(() => {
		setSelectedCategory(categoryFromUrl);
	}, [categoryFromUrl]);

	// ================= HANDLE CATEGORY CHANGE =================

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);

		// UPDATE URL

		if (category === "All") {
			router.push("/menu");
		} else {
			router.push(`/menu?category=${encodeURIComponent(category)}`);
		}
	};

	// ================= FILTER ITEMS =================

	useEffect(() => {
		let filtered = [...items];

		// CATEGORY FILTER

if (selectedCategory && selectedCategory !== "All") {
	filtered = filtered.filter((item) => {
		return item.category?._id === selectedCategory;
	});
}

		// SEARCH FILTER

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();

			filtered = filtered.filter((item) => {
				const nameMatch = item.name?.toLowerCase().includes(query);

				const descriptionMatch = item.description
					?.toLowerCase()
					.includes(query);

				const categoryMatch = item.category?.name
					?.toLowerCase()
					.includes(query);

				return nameMatch || descriptionMatch || categoryMatch;
			});
		}

		setFilteredItems(filtered);
	}, [items, selectedCategory, searchQuery]);

	return (
		<AppShell>
			<div className="space-y-10 pb-16">
				{/* HEADER */}

				<MenuHeader items={items} onSearch={setSearchQuery} />

				{/* CATEGORY TABS */}

				<CategoryTabs
					activeCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>

				{/* MENU GRID */}

				<MenuGrid items={filteredItems} loading={loading} />
			</div>
		</AppShell>
	);
}
