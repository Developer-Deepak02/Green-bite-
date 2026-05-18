"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Loader2, Search, X } from "lucide-react";

interface SearchModalProps {
	open: boolean;

	onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
	const [query, setQuery] = useState("");

	const [loading, setLoading] = useState(false);

	const [results, setResults] = useState<any[]>([]);

	/* CLOSE ON ESC */

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [onClose]);

	/* SEARCH */

	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			return;
		}

		const timer = setTimeout(async () => {
			try {
				setLoading(true);

				const res = await fetch(
					`http://localhost:5000/api/menu?search=${query}`,
				);

				const data = await res.json();

				setResults(data.items || []);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}, 400);

		return () => clearTimeout(timer);
	}, [query]);

	if (!open) return null;

	return (
		<div
			className="
				fixed inset-0 z-[100]
				bg-black/70
				backdrop-blur-md
				flex items-start justify-center
				pt-24
				px-4
			"
			onClick={onClose}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="
					w-full
					max-w-2xl
					rounded-[32px]
					border border-white/10
					bg-[#0B1220]
					backdrop-blur-2xl
					shadow-2xl shadow-black/40
					overflow-hidden
				"
			>
				{/* TOP */}

				<div className="p-5 border-b border-white/10">
					<div className="relative">
						<Search
							className="
								absolute
								left-4
								top-1/2
								-translate-y-1/2
								w-5 h-5
								text-gray-500
							"
						/>

						<input
							autoFocus
							type="text"
							placeholder="Search burgers, pizza, drinks..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="
								w-full
								h-14
								rounded-2xl
								bg-white/[0.04]
								border border-white/10
								pl-12
								pr-14
								text-white
								placeholder:text-gray-500
								outline-none
								focus:border-orange-500/40
							"
						/>

						<button
							onClick={onClose}
							className="
								absolute
								right-4
								top-1/2
								-translate-y-1/2
								text-gray-500
								hover:text-white
							"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* RESULTS */}

				<div
					className="
						max-h-[65vh]
						overflow-y-auto
						p-4
					"
				>
					{/* EMPTY */}

					{!query && (
						<div
							className="
								py-16
								text-center
							"
						>
							<p className="text-white text-lg font-semibold">
								Search Your Favorite Food
							</p>

							<p className="text-gray-500 text-sm mt-2">
								Burgers, pizza, pasta, desserts & more
							</p>
						</div>
					)}

					{/* LOADING */}

					{loading && (
						<div
							className="
								py-16
								flex items-center justify-center
							"
						>
							<Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
						</div>
					)}

					{/* NO RESULTS */}

					{!loading && query && results.length === 0 && (
						<div
							className="
								py-16
								text-center
							"
						>
							<p className="text-white font-semibold">No food found</p>

							<p className="text-gray-500 text-sm mt-2">Try another keyword</p>
						</div>
					)}

					{/* RESULTS */}

					<div className="space-y-3">
						{results.map((item) => (
							<Link
								key={item._id}
								href={`/menu`}
								onClick={onClose}
								className="
									flex items-center gap-4
									p-3
									rounded-2xl
									border border-white/10
									bg-white/[0.03]
									hover:bg-white/[0.05]
									transition-all duration-300
								"
							>
								{/* IMAGE */}

								<div
									className="
										relative
										w-20 h-20
										rounded-2xl
										overflow-hidden
										shrink-0
										bg-white/5
									"
								>
									<Image
										src={item.image || "/placeholder-food.jpg"}
										alt={item.name}
										fill
										className="object-cover"
									/>
								</div>

								{/* INFO */}

								<div className="min-w-0 flex-1">
									<h3
										className="
											text-white
											font-semibold
											line-clamp-1
										"
									>
										{item.name}
									</h3>

									<p
										className="
											text-gray-400
											text-sm
											line-clamp-1
											mt-1
										"
									>
										{item.description}
									</p>

									<div
										className="
											flex items-center justify-between
											mt-3
										"
									>
										<p
											className="
												text-orange-400
												font-bold
											"
										>
											₹{item.price}
										</p>

										{item.category?.name && (
											<div
												className="
													text-[11px]
													px-2 py-1
													rounded-full
													bg-orange-500/10
													border border-orange-500/20
													text-orange-400
												"
											>
												{item.category.name}
											</div>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
