"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import AppShell from "@/components/shared/AppShell";

import MenuHeader from "@/components/menu/MenuHeader";

import CategoryTabs from "@/components/menu/CategoryTabs";

import MenuGrid from "@/components/menu/MenuGrid";

import { api } from "@/lib/api";

import { MenuItem } from "@/types";

export default function MenuPage() {
	const searchParams = useSearchParams();

	const categoryFromUrl = searchParams.get("category") || "All";

	const [items, setItems] = useState<MenuItem[]>([]);

	const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

	const [loading, setLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

	const [searchQuery, setSearchQuery] = useState("");

	/* FETCH MENU */

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await api.get("/menu");

				const menuItems = response.data.items || [];

				setItems(menuItems);
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenu();
	}, []);

	/* UPDATE CATEGORY FROM URL */

	useEffect(() => {
		setSelectedCategory(categoryFromUrl);
	}, [categoryFromUrl]);

	/* FILTER ITEMS */

	useEffect(() => {
		let filtered = [...items];

		/* CATEGORY FILTER */

		if (selectedCategory && selectedCategory !== "All") {
			filtered = filtered.filter((item) =>
				item.category?.name
					?.toLowerCase()
					.includes(selectedCategory.toLowerCase()),
			);
		}

		/* SEARCH FILTER */

		if (searchQuery.trim()) {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		setFilteredItems(filtered);
	}, [items, selectedCategory, searchQuery]);

	return (
		<AppShell>
			<div className="space-y-10 pb-16">
				<MenuHeader items={items} onSearch={setSearchQuery} />

				<CategoryTabs
					activeCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
				/>

				<MenuGrid items={filteredItems} loading={loading} />
			</div>
		</AppShell>
	);
}
