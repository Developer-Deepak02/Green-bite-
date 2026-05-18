"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/shared/AppShell";
import MenuHeader from "@/components/menu/MenuHeader";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuGrid from "@/components/menu/MenuGrid";

import { api } from "@/lib/api";
import { MenuItem } from "@/types";

export default function MenuPage() {
	const [items, setItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState("All");

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await api.get("/menu");

				setItems(response.data.items || []);
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenu();
	}, []);

	/* FILTERED ITEMS */

	const filteredItems = items.filter((item) => {
		const categoryMatch =
			selectedCategory === "All" || item.category?.name === selectedCategory;

		const searchMatch =
			searchQuery.trim() === "" ||
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description?.toLowerCase().includes(searchQuery.toLowerCase());

		return categoryMatch && searchMatch;
	});

	return (
		<AppShell>
			<div className="space-y-10 pb-16">
				<MenuHeader items={items} onSearch={setSearchQuery} />

				<CategoryTabs onCategoryChange={setSelectedCategory} />

				<MenuGrid items={filteredItems} loading={loading} />
			</div>
		</AppShell>
	);
}
