"use client";

import { useEffect, useState } from "react";

import { Category } from "@/types";
import { api } from "@/lib/api";

const allTab = {
	_id: "all",
	name: "All",
};

interface CategoryTabsProps {
	onCategoryChange?: (category: string) => void;
}

export default function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [active, setActive] = useState("all");

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

	const handleCategoryChange = (categoryId: string, categoryName: string) => {
		setActive(categoryId);

		if (onCategoryChange) {
			onCategoryChange(categoryName);
		}
	};

	return (
		<div className="sticky top-[72px] z-30">
			<div
				className="
					backdrop-blur-2xl
					bg-[#081028]/85
					border-y border-white/5
					py-5
				"
			>
				{/* CATEGORY TABS */}

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
						const activeTab = active === category._id;

						return (
							<button
								key={category._id}
								onClick={() =>
									handleCategoryChange(category._id, category.name)
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
