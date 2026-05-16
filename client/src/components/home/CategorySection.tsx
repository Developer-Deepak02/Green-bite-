"use client";

import Image from "next/image";

const categories = [
	{
		id: 1,
		name: "Pizza",
		items: "12 Dishes",
		image:
			"https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
	},
	{
		id: 2,
		name: "Burgers",
		items: "8 Dishes",
		image:
			"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
	},
	{
		id: 3,
		name: "Pasta",
		items: "10 Dishes",
		image:
			"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",
	},
	{
		id: 4,
		name: "Desserts",
		items: "6 Dishes",
		image:
			"https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
	},
	{
		id: 5,
		name: "Drinks",
		items: "14 Items",
		image:
			"https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
	},
];

export default function CategorySection() {
	return (
		<section className="relative py-16 overflow-hidden">
			{/* Glow */}
			<div
				className="
					absolute
					left-1/2
					top-0
					-translate-x-1/2
					w-[500px]
					h-[500px]
					bg-orange-500/10
					blur-[140px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="max-w-7xl mx-auto px-4">
				{/* Header */}
				<div className="flex items-end justify-between mb-8">
					<div>
						<p className="text-orange-500 font-medium mb-2">
							Explore Categories
						</p>

						<h2
							className="
								text-3xl
								md:text-4xl
								font-black
								text-white
							"
						>
							Popular Categories
						</h2>
					</div>

					<button
						className="
							hidden md:block
							text-sm
							text-gray-400
							hover:text-white
							transition
						"
					>
						View All
					</button>
				</div>

				{/* Categories */}
				<div
					className="
						flex gap-5
						overflow-x-auto
						scrollbar-hide
						pb-2
					"
				>
					{categories.map((category) => (
						<div
							key={category.id}
							className="
								group
								min-w-[220px]
								md:min-w-[240px]
								bg-white/5
								border border-white/10
								backdrop-blur-xl
								rounded-3xl
								overflow-hidden
								hover:border-orange-500/40
								hover:-translate-y-2
								transition-all duration-300
								cursor-pointer
							"
						>
							{/* Image */}
							<div className="relative h-44 overflow-hidden">
								<Image
									src={category.image}
									alt={category.name}
									fill
									className="
										object-cover
										group-hover:scale-110
										transition-transform duration-500
									"
								/>

								<div
									className="
										absolute inset-0
										bg-gradient-to-t
										from-black/70
										to-transparent
									"
								/>
							</div>

							{/* Content */}
							<div className="p-5">
								<h3
									className="
										text-xl
										font-bold
										text-white
										mb-1
									"
								>
									{category.name}
								</h3>

								<p className="text-sm text-gray-400">{category.items}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
