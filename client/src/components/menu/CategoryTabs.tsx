"use client";

import { useEffect, useState } from "react";

import { Category } from "@/types";

import { api } from "@/lib/api";

const allTab = {
	_id: "all",

	name: "All",
};

interface CategoryTabsProps {
	activeCategory?: string;

	onCategoryChange?: (category: string) => void;
}

export default function CategoryTabs({
	activeCategory = "all",

	onCategoryChange,
}: CategoryTabsProps) {
	const [categories, setCategories] = useState<Category[]>([]);

	// ================= FETCH CATEGORIES =================

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get("/categories");

				setCategories(response.data || []);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};

		fetchCategories();
	}, []);

	// ================= HANDLE CATEGORY CHANGE =================

	const handleCategoryChange = (categoryId: string) => {
		if (onCategoryChange) {
			onCategoryChange(categoryId);
		}
	};

	return (
		<div className="sticky top-[72px] z-30">
			<div className="py-5">
				<div
					className="
						flex
						items-center
						gap-3
						overflow-x-auto
						scroll-smooth
						pb-1
						[&::-webkit-scrollbar]:hidden
						[-ms-overflow-style:none]
						[scrollbar-width:none]
					"
				>
					{[allTab, ...categories].map((category) => {
						const activeTab =
							activeCategory === category._id ||
							(activeCategory === "All" &&
								category._id === "all");

						return (
							<button
								key={category._id}
								onClick={() =>
									handleCategoryChange(
										category._id === "all"
											? "All"
											: category._id,
									)
								}
								className={`
									flex-shrink-0
									h-12
									px-6
									rounded-2xl
									text-sm
									font-semibold
									border
									transition-all duration-300
									${
										activeTab
											? `
												bg-orange-500
												border-orange-500
												text-white
												shadow-lg shadow-orange-500/20
											`
											: `
												bg-white/[0.03]
												border-white/10
												text-gray-300
												hover:bg-white/[0.06]
												hover:border-white/20
												hover:text-white
											`
									}
								`}
							>
								{category.name}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}