"use client";

import { useEffect, useState } from "react";

import {
	Star,
	Send,
	MessageSquare,
	Sparkles,
	Pencil,
	Trash2,
	X,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

import { toast } from "sonner";

interface Review {
	_id: string;

	rating: number;

	comment: string;

	createdAt: string;

	user: {
		_id?: string;
		name: string;
	};
}

interface Props {
	menuItemId: string;
}

export default function ReviewSection({ menuItemId }: Props) {
	const { user } = useAuthStore();

	const [reviews, setReviews] = useState<Review[]>([]);

	const [loading, setLoading] = useState(true);

	const [rating, setRating] = useState(5);

	const [hoveredRating, setHoveredRating] = useState(0);

	const [comment, setComment] = useState("");

	const [submitting, setSubmitting] = useState(false);

	const [averageRating, setAverageRating] = useState(0);

	const [totalReviews, setTotalReviews] = useState(0);

	const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

	const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

	// ================= FETCH REVIEWS =================

	const fetchReviews = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/api/reviews/menu/${menuItemId}`,
			);

			const data = await res.json();

			setReviews(data.reviews || []);

			setAverageRating(data.averageRating || 0);

			setTotalReviews(data.totalReviews || 0);
		} catch (error) {
			console.error(error);

			toast.error("Failed to load reviews");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [menuItemId]);

	// ================= SUBMIT REVIEW =================

	const handleSubmit = async () => {
		try {
			setSubmitting(true);

			const token = localStorage.getItem("token");

			const url = editingReviewId
				? `http://localhost:5000/api/reviews/${editingReviewId}`
				: "http://localhost:5000/api/reviews";

			const method = editingReviewId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					menuItem: menuItemId,
					rating,
					comment,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Action failed");

				return;
			}

			toast.success(
				editingReviewId
					? "Review updated successfully"
					: "Review submitted successfully",
			);

			setComment("");

			setRating(5);

			setEditingReviewId(null);

			await fetchReviews();
		} catch (error) {
			console.error(error);

			toast.error("Failed to submit review");
		} finally {
			setSubmitting(false);
		}
	};

	// ================= EDIT REVIEW =================

	const handleEdit = (review: Review) => {
		setEditingReviewId(review._id);

		setComment(review.comment);

		setRating(review.rating);

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	};

	// ================= DELETE REVIEW =================

	const handleDelete = async (reviewId: string) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
				method: "DELETE",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to delete review");

				return;
			}

			toast.success("Review deleted successfully");

			setDeletingReviewId(null);

			await fetchReviews();
		} catch (error) {
			console.error(error);

			toast.error("Failed to delete review");
		}
	};

	return (
		<section className="mt-24 pb-10">
			<div className="max-w-6xl mx-auto px-4 md:px-6">
				{/* HEADER */}

				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
					<div>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5">
							<Sparkles className="w-4 h-4" />
							Customer Feedback
						</div>

						<h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
							Reviews & <span className="text-orange-500">Ratings</span>
						</h2>

						<p className="text-gray-400 mt-4 text-lg">
							Real experiences shared by BiteRush customers.
						</p>
					</div>

					<div className="w-full lg:w-[320px] rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6">
						<div className="flex items-center gap-5">
							<div className="w-16 h-16 rounded-3xl bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/20">
								<Star className="w-8 h-8 fill-white text-white" />
							</div>

							<div>
								<h3 className="text-4xl font-black text-white">
									{averageRating.toFixed(1)}
								</h3>

								<p className="text-gray-400 text-sm mt-1">
									Based on {totalReviews} reviews
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* REVIEWS */}

				{loading ? (
					<div className="space-y-6">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="h-44 rounded-[36px] bg-white/[0.03] border border-white/10 animate-pulse"
							/>
						))}
					</div>
				) : reviews.length === 0 ? (
					<div className="text-center py-20 rounded-[36px] bg-white/[0.03] border border-white/10">
						<div className="w-20 h-20 mx-auto rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
							<MessageSquare className="w-10 h-10 text-orange-500" />
						</div>

						<h3 className="text-3xl font-black text-white">No Reviews Yet</h3>

						<p className="text-gray-400 mt-4">
							Be the first person to review this dish.
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{reviews.map((review) => {
							const initial = review.user?.name?.charAt(0).toUpperCase() || "U";

							const isOwner = user?.id === review.user?._id;

							return (
								<div
									key={review._id}
									className="rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-7"
								>
									<div className="flex gap-5">
										<div className="w-14 h-14 flex-shrink-0 rounded-3xl bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
											{initial}
										</div>

										<div className="flex-1">
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
												<div>
													<h4 className="text-white font-bold text-lg">
														{review.user?.name}
													</h4>

													<p className="text-gray-500 text-sm mt-1">
														{new Date(review.createdAt).toLocaleDateString()}
													</p>
												</div>

												<div className="flex items-center gap-2">
													<div className="flex items-center gap-1">
														{[1, 2, 3, 4, 5].map((star) => (
															<Star
																key={star}
																className={`w-5 h-5 ${
																	star <= review.rating
																		? "fill-yellow-400 text-yellow-400"
																		: "text-gray-600"
																}`}
															/>
														))}
													</div>

													{isOwner && (
														<div className="flex items-center gap-2 ml-4">
															<button
																onClick={() => handleEdit(review)}
																className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center"
															>
																<Pencil className="w-4 h-4" />
															</button>

															<button
																onClick={() => setDeletingReviewId(review._id)}
																className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center"
															>
																<Trash2 className="w-4 h-4" />
															</button>
														</div>
													)}
												</div>
											</div>

											<p className="mt-5 text-gray-300 leading-relaxed text-[15px]">
												{review.comment}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{/* REVIEW FORM */}

				{user && (
					<div className="mt-12 rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8">
						<div className="flex items-center justify-between gap-4 mb-8">
							<div className="flex items-center gap-4">
								<div className="w-14 h-14 rounded-3xl bg-orange-500 text-white font-bold text-lg flex items-center justify-center">
									{user?.name?.charAt(0).toUpperCase()}
								</div>

								<div>
									<h3 className="text-white font-bold text-xl">
										{editingReviewId ? "Edit Your Review" : "Write a Review"}
									</h3>

									<p className="text-gray-400 text-sm mt-1">
										Share your food experience
									</p>
								</div>
							</div>

							{editingReviewId && (
								<button
									onClick={() => {
										setEditingReviewId(null);
										setComment("");
										setRating(5);
									}}
									className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center"
								>
									<X className="w-5 h-5" />
								</button>
							)}
						</div>

						<div className="flex items-center gap-2 mb-6">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									onMouseEnter={() => setHoveredRating(star)}
									onMouseLeave={() => setHoveredRating(0)}
									onClick={() => setRating(star)}
									className="transition-all duration-200 hover:scale-110"
								>
									<Star
										className={`w-8 h-8 transition-all ${
											star <= (hoveredRating || rating)
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-600"
										}`}
									/>
								</button>
							))}
						</div>

						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Tell others what you loved about this dish..."
							className="w-full h-36 rounded-[28px] bg-[#0B1220] border border-white/10 p-5 text-white placeholder:text-gray-500 outline-none resize-none focus:border-orange-500/40 transition-all"
						/>

						<div className="flex justify-end mt-5">
							<button
								onClick={handleSubmit}
								disabled={submitting}
								className="h-13 px-7 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-xl shadow-orange-500/20"
							>
								<Send className="w-4 h-4" />

								{submitting
									? editingReviewId
										? "Updating..."
										: "Submitting..."
									: editingReviewId
										? "Update Review"
										: "Submit Review"}
							</button>
						</div>
					</div>
				)}

				{/* DELETE MODAL */}

				{deletingReviewId && (
					<div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
						<div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#0B1220] p-8">
							<h2 className="text-2xl font-bold text-white">Delete Review</h2>

							<p className="text-gray-400 mt-4">
								Are you sure you want to delete this review?
							</p>

							<div className="grid grid-cols-2 gap-4 mt-8">
								<button
									onClick={() => setDeletingReviewId(null)}
									className="h-12 rounded-2xl bg-white/5 border border-white/10 text-white font-medium"
								>
									Cancel
								</button>

								<button
									onClick={() => handleDelete(deletingReviewId)}
									className="h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
