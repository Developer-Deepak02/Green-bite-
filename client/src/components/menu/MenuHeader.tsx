"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MenuHeaderProps {
	items?: {
		name: string;
	}[];
	onSearch?: (query: string) => void;
}

export default function MenuHeader({ items = [], onSearch }: MenuHeaderProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setSuggestions([]);
			return;
		}

		const filtered = items
			.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			)
			.map((item) => item.name)
			.slice(0, 6);

		setSuggestions(filtered);
	}, [searchQuery, items]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearch = (value: string) => {
		if (onSearch) {
			onSearch(value);
		}
	};

	return (
		<section
			className="
				relative
				pt-6
				pb-24
				z-[200]
			"
		>
			{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-0
					left-1/2
					-translate-x-1/2
					w-[750px]
					h-[320px]
					bg-orange-500/10
					blur-[150px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-[300]">
				<div className="max-w-4xl mx-auto text-center">
					{/* BADGE */}

					<div
						className="
							inline-flex
							items-center
							bg-orange-500/10
							border border-orange-500/20
							text-orange-400
							px-4 py-2
							rounded-full
							text-sm
							font-medium
							mb-6
						"
					>
						Explore Our Menu
					</div>

					{/* TITLE */}

					<h1
						className="
							text-5xl
							md:text-6xl
							lg:text-7xl
							font-black
							leading-[0.95]
							tracking-tight
						"
					>
						Delicious Meals
						<span className="text-orange-500"> Made Fresh</span>
					</h1>

					{/* DESCRIPTION */}

					<p
						className="
							mt-6
							text-lg
							md:text-xl
							text-gray-400
							max-w-2xl
							mx-auto
							leading-relaxed
						"
					>
						Browse handcrafted dishes made with premium ingredients, bold
						flavors, and lightning-fast delivery.
					</p>

					{/* SEARCH */}

					<div
						ref={searchRef}
						className="
							flex
							justify-center
							mt-12
							relative
							z-[9999]
						"
					>
						<div className="relative w-full max-w-2xl">
							{/* SEARCH ICON */}

							<Search
								className="
									absolute
									left-5
									top-1/2
									-translate-y-1/2
									w-5
									h-5
									text-gray-400
									z-20
								"
							/>

							{/* INPUT */}

							<input
								type="text"
								placeholder="Search pizza, burger, pasta..."
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);

									setShowSuggestions(true);
								}}
								onFocus={() => {
									if (suggestions.length > 0) {
										setShowSuggestions(true);
									}
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSearch(searchQuery);

										setShowSuggestions(false);
									}
								}}
								className="
									w-full
									h-16
									pl-14
									pr-6
									rounded-3xl
									bg-[#131c31]
									border border-orange-500/40
									backdrop-blur-2xl
									text-white
									text-lg
									placeholder:text-gray-500
									outline-none
									transition-all duration-300
									focus:border-orange-500
									focus:ring-4
									focus:ring-orange-500/10
									shadow-[0_10px_40px_rgba(0,0,0,0.25)]
									relative
									z-10
								"
							/>

							{/* SUGGESTIONS DROPDOWN */}

							{showSuggestions && suggestions.length > 0 && (
								<div
									className="
											absolute
											top-[76px]
											left-0
											right-0
											z-[99999]
											rounded-3xl
											overflow-hidden
											bg-[#0f172a]
											border border-white/10
											backdrop-blur-3xl
											shadow-[0_30px_80px_rgba(0,0,0,0.85)]
										"
								>
									<div className="py-2">
										{suggestions.map((item, index) => (
											<button
												key={`${item}-${index}`}
												onClick={() => {
													setSearchQuery(item);

													handleSearch(item);

													setShowSuggestions(false);
												}}
												className="
															w-full
															flex
															items-center
															gap-3
															px-5
															py-4
															text-left
															text-gray-200
															hover:bg-orange-500/10
															hover:text-white
															transition-all
															duration-200
														"
											>
												<Search className="w-4 h-4 text-orange-400 shrink-0" />

												<span className="font-medium">{item}</span>
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
