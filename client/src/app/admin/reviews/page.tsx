"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
	Star,
	Trash2,
	MessageSquare,
	Search,
	X,
	CalendarDays,
} from "lucide-react";

import { toast } from "sonner";

interface Review {
	_id: string;

	rating: number;

	comment: string;

	createdAt: string;

	user: {
		_id: string;
		name: string;
		email: string;
	};

	menuItem: {
		_id: string;
		name: string;
		image: string;
		price: number;
	};
}

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState<Review[]>([]);

	const [loading, setLoading] = useState(true);

	const [search, setSearch] = useState("");

	const [ratingFilter, setRatingFilter] = useState("all");

	const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

	const [deleting, setDeleting] = useState(false);

	// ================= FETCH REVIEWS =================

	const fetchReviews = async () => {
		try {
			setLoading(true);

			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/admin/reviews", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to fetch reviews");

				return;
			}

			setReviews(data.reviews || []);
		} catch (error) {
			console.error(error);

			toast.error("Failed to fetch reviews");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	// ================= DELETE REVIEW =================

	const handleDelete = async () => {
		if (!deleteReviewId) return;

		try {
			setDeleting(true);

			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/admin/reviews/${deleteReviewId}`,
				{
					method: "DELETE",

					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to delete review");

				return;
			}

			setReviews((prev) =>
				prev.filter((review) => review._id !== deleteReviewId),
			);

			toast.success("Review deleted successfully");

			setDeleteReviewId(null);
		} catch (error) {
			console.error(error);

			toast.error("Failed to delete review");
		} finally {
			setDeleting(false);
		}
	};

	// ================= FILTERED REVIEWS =================

	const filteredReviews = reviews.filter((review) => {
		const matchesSearch =
			review.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
			review.menuItem?.name?.toLowerCase().includes(search.toLowerCase()) ||
			review.comment?.toLowerCase().includes(search.toLowerCase());

		const matchesRating =
			ratingFilter === "all" ? true : review.rating === Number(ratingFilter);

		return matchesSearch && matchesRating;
	});

	// ================= STATS =================

	const averageRating =
		reviews.length === 0
			? 0
			: (
					reviews.reduce((acc, review) => acc + review.rating, 0) /
					reviews.length
				).toFixed(1);

	const fiveStarCount = reviews.filter((review) => review.rating === 5).length;

	// ================= LOADING =================

	if (loading) {
		return (
			<div className="p-6 md:p-8">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div
							key={item}
							className="
								h-[320px]
								rounded-[32px]
								bg-white/[0.03]
								border border-white/10
								animate-pulse
							"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="p-6 md:p-8">
				{/* HEADER */}

				<div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">
					<div>
						<p className="text-orange-400 text-sm font-medium mb-2">
							Manage customer reviews & ratings
						</p>

						<h1 className="text-4xl font-black text-white">
							Review Management
						</h1>
					</div>

					<div className="flex flex-wrap gap-4">
						{/* SEARCH */}

						<div className="relative">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

							<input
								type="text"
								placeholder="Search reviews..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="
									h-12
									w-[260px]
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
									pl-11
									pr-4
									text-white
									placeholder:text-gray-500
									outline-none
								"
							/>
						</div>

						{/* FILTER */}

						<select
							value={ratingFilter}
							onChange={(e) => setRatingFilter(e.target.value)}
							className="
								h-12
								px-5
								rounded-2xl
								bg-white/[0.03]
								border border-white/10
								text-white
								outline-none
							"
						>
							<option value="all">All Ratings</option>

							<option value="5">5 Stars</option>

							<option value="4">4 Stars</option>

							<option value="3">3 Stars</option>

							<option value="2">2 Stars</option>

							<option value="1">1 Star</option>
						</select>
					</div>
				</div>

				{/* STATS */}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-400 text-sm mb-2">Total Reviews</p>

						<h2 className="text-4xl font-black text-white">{reviews.length}</h2>
					</div>

					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-400 text-sm mb-2">Average Rating</p>

						<h2 className="text-4xl font-black text-yellow-400">
							{averageRating}
						</h2>
					</div>

					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-400 text-sm mb-2">5 Star Reviews</p>

						<h2 className="text-4xl font-black text-orange-400">
							{fiveStarCount}
						</h2>
					</div>
				</div>

				{/* EMPTY */}

				{filteredReviews.length === 0 ? (
					<div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-16 text-center">
						<h2 className="text-3xl font-black text-white">No Reviews Found</h2>

						<p className="text-gray-400 mt-4">No reviews match your filters.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						{filteredReviews.map((review) => (
							<div
								key={review._id}
								className="
									rounded-[36px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-2xl
									p-6
								"
							>
								{/* TOP */}

								<div className="flex items-start justify-between gap-5">
									<div className="flex gap-4">
										<div className="relative w-20 h-20 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
											<Image
												src={review.menuItem?.image || "/placeholder-food.jpg"}
												alt={review.menuItem?.name}
												fill
												className="object-cover"
											/>
										</div>

										<div>
											<h2 className="text-xl font-bold text-white">
												{review.menuItem?.name}
											</h2>

											<p className="text-gray-400 text-sm mt-1">
												By {review.user?.name}
											</p>

											<p className="text-gray-500 text-sm">
												{review.user?.email}
											</p>

											<div className="flex items-center gap-1 mt-3">
												{[1, 2, 3, 4, 5].map((star) => (
													<Star
														key={star}
														className={`w-4 h-4 ${
															star <= review.rating
																? "fill-yellow-400 text-yellow-400"
																: "text-gray-600"
														}`}
													/>
												))}
											</div>
										</div>
									</div>

									<button
										onClick={() => setDeleteReviewId(review._id)}
										className="
											w-11 h-11
											rounded-2xl
											bg-red-500/10
											border border-red-500/20
											text-red-400
											flex items-center justify-center
											hover:bg-red-500/20
											transition-all
										"
									>
										<Trash2 className="w-5 h-5" />
									</button>
								</div>

								{/* COMMENT */}

								<div className="mt-6 rounded-3xl bg-[#0B1220] border border-white/10 p-5">
									<div className="flex items-center gap-2 mb-3">
										<MessageSquare className="w-4 h-4 text-orange-400" />

										<p className="text-sm text-orange-400 font-medium">
											Customer Review
										</p>
									</div>

									<p className="text-gray-300 leading-relaxed">
										{review.comment || "No comment"}
									</p>
								</div>

								{/* DATE */}

								<div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
									<CalendarDays className="w-4 h-4" />

									{new Date(review.createdAt).toLocaleString()}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* DELETE MODAL */}

			{deleteReviewId && (
				<div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
					<div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#0B1220] p-8">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold text-white">Delete Review</h2>

							<button
								onClick={() => setDeleteReviewId(null)}
								className="
									w-10 h-10
									rounded-xl
									bg-white/5
									border border-white/10
									text-white
									flex items-center justify-center
								"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<p className="text-gray-400 mt-4 leading-relaxed">
							Are you sure you want to permanently delete this review?
						</p>

						<div className="grid grid-cols-2 gap-4 mt-8">
							<button
								onClick={() => setDeleteReviewId(null)}
								className="
									h-12
									rounded-2xl
									bg-white/5
									border border-white/10
									text-white
									font-medium
								"
							>
								Cancel
							</button>

							<button
								onClick={handleDelete}
								disabled={deleting}
								className="
									h-12
									rounded-2xl
									bg-red-500
									hover:bg-red-600
									disabled:opacity-50
									text-white
									font-medium
									transition-all
								"
							>
								{deleting ? "Deleting..." : "Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
