"use client";

import { useEffect, useState } from "react";

import { Star, Send } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

interface Review {
	_id: string;
	rating: number;
	comment: string;
	createdAt: string;
	user: {
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
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [averageRating, setAverageRating] = useState(0);
	const [totalReviews, setTotalReviews] = useState(0);
	const fetchReviews = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/api/reviews/${menuItemId}`,
			);

			const data = await res.json();
			setReviews(data.reviews || []);
			setAverageRating(data.averageRating || 0);
			setTotalReviews(data.totalReviews || 0);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [menuItemId]);

	const handleSubmit = async () => {
		try {
			setSubmitting(true);
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:5000/api/reviews", {
				method: "POST",
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
				alert(data.message);
				return;
			}
			setComment("");
			setRating(5);
			await fetchReviews();
		} catch (error) {
			console.error(error);
			alert("Failed to submit review");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="mt-24">
			<div className="max-w-5xl mx-auto">
				{/* HEADER */}
				<div className="flex items-center justify-between flex-wrap gap-6 mb-10">
					<div>
						<h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
						<p className="text-gray-400 mt-2">
							Real feedback from BiteRush customers
						</p>
					</div>
					<div
						className="
							px-6 py-4
							rounded-3xl
							bg-white/[0.03]
							border border-white/10
							backdrop-blur-xl
						"
					>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1">
								<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
					<span className="text-2xl font-bold text-white">
									{averageRating.toFixed(1)}
								</span>
							</div>
							<div className="w-px h-8 bg-white/10" />
							<div className="text-sm text-gray-400">
								{totalReviews} Reviews
							</div>
						</div>
					</div>
				</div>
				{/* REVIEW FORM */}
				{user && (
					<div
						className="
							mb-10
							p-6
							rounded-[32px]
							bg-white/[0.03]
							border border-white/10
							backdrop-blur-xl
						"
					>
						<h3 className="text-xl font-semibold text-white mb-5">
							Write a Review
						</h3>

						{/* STARS */}

						<div className="flex items-center gap-2 mb-5">
							{[1, 2, 3, 4, 5].map((star) => (
								<button key={star} onClick={() => setRating(star)}>
									<Star
										className={`
											w-7 h-7 transition-all
											${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
										`}
									/>
								</button>
							))}
						</div>

						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Share your experience..."
							className="
								w-full
								h-32
								rounded-3xl
								bg-[#0B1220]
								border border-white/10
								p-5
								text-white
								placeholder:text-gray-500
								outline-none
								resize-none
								focus:border-orange-500/40
							"
						/>

						<button
							onClick={handleSubmit}
							disabled={submitting}
							className="
								mt-5
								h-12
								px-6
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								text-white
								font-semibold
								inline-flex
								items-center
								gap-2
							"
						>
							<Send className="w-4 h-4" />

							{submitting ? "Submitting..." : "Submit Review"}
						</button>
					</div>
				)}

				{/* REVIEWS */}

				{loading ? (
					<div className="space-y-5">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="
									h-36
									rounded-[32px]
									bg-white/[0.03]
									border border-white/10
									animate-pulse
								"
							/>
						))}
					</div>
				) : reviews.length === 0 ? (
					<div
						className="
							text-center
							py-20
							rounded-[32px]
							bg-white/[0.03]
							border border-white/10
						"
					>
						<h3 className="text-2xl font-bold text-white">No Reviews Yet</h3>

						<p className="text-gray-400 mt-3">
							Be the first to review this dish.
						</p>
					</div>
				) : (
					<div className="space-y-5">
						{reviews.map((review) => {
							const initial = review.user?.name?.charAt(0).toUpperCase() || "U";

							return (
								<div
									key={review._id}
									className="
										p-6
										rounded-[32px]
										bg-white/[0.03]
										border border-white/10
										backdrop-blur-xl
									"
								>
									<div className="flex items-start gap-4">
										<div
											className="
												w-12 h-12
												rounded-2xl
												bg-orange-500
												flex items-center justify-center
												text-white
												font-bold
											"
										>
											{initial}
										</div>

										<div className="flex-1">
											<div className="flex items-center justify-between gap-4 flex-wrap">
												<div>
													<h4 className="text-white font-semibold">
														{review.user?.name}
													</h4>

													<p className="text-sm text-gray-500 mt-1">
														{new Date(review.createdAt).toLocaleDateString()}
													</p>
												</div>

												<div className="flex items-center gap-1">
													{[1, 2, 3, 4, 5].map((star) => (
														<Star
															key={star}
															className={`
																w-4 h-4
																${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
															`}
														/>
													))}
												</div>
											</div>

											<p className="mt-4 text-gray-300 leading-relaxed">
												{review.comment}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
