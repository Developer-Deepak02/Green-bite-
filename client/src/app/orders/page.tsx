"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import {
	MapPin,
	PackageCheck,
	ChefHat,
	Bike,
	CheckCircle2,
	Clock3,
	CreditCard,
	Wallet,
} from "lucide-react";

interface Order {
	_id: string;

	items: {
		name: string;
		price: number;
		quantity: number;
	}[];

	totalAmount: number;

	status: string;

	paymentMethod: string;

	paymentStatus: string;

	address?: {
		street: string;
		city: string;
		state: string;
		pincode: string;
	};

	createdAt: string;
}

const steps = ["confirmed", "preparing", "out_for_delivery", "delivered"];

export default function OrdersPage() {
	const [orders, setOrders] = useState<Order[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch("http://localhost:5000/api/orders/my", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				if (Array.isArray(data.orders)) {
					setOrders(data.orders);
				} else if (Array.isArray(data)) {
					setOrders(data);
				} else {
					setOrders([]);
				}
			} catch (error) {
				console.error(error);
				setOrders([]);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const getCurrentStep = (status: string) => {
		return steps.findIndex((step) => status.toLowerCase().includes(step));
	};

	const getStatusStyle = (status: string) => {
		const lower = status.toLowerCase();

		if (lower.includes("delivered")) {
			return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
		}

		if (lower.includes("preparing")) {
			return "bg-orange-500/10 text-orange-400 border-orange-500/20";
		}

		if (lower.includes("out_for_delivery")) {
			return "bg-sky-500/10 text-sky-400 border-sky-500/20";
		}

		if (lower.includes("cancelled")) {
			return "bg-red-500/10 text-red-400 border-red-500/20";
		}

		return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
	};

	if (loading) {
		return (
			<div className="min-h-screen px-4 py-10">
				<div className="max-w-5xl mx-auto space-y-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="
								h-44
								rounded-3xl
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
		<ProtectedRoute>
			<Navbar />
			<section className="min-h-screen px-4 md:px-6 py-8">
				<div className="max-w-5xl mx-auto">
					{/* HEADER */}

					<div className="mb-10">
						<p
							className="
								text-orange-400
								text-sm
								font-medium
								mb-3
							"
						>
							Track & manage your orders
						</p>

						<h1
							className="
								text-3xl
								md:text-4xl
								font-bold
								text-white
								tracking-tight
							"
						>
							Your Orders
						</h1>
					</div>

					{/* EMPTY */}

					{orders.length === 0 ? (
						<div
							className="
								border border-white/10
								bg-white/[0.03]
								backdrop-blur-xl
								rounded-3xl
								p-10
								text-center
							"
						>
							<div
								className="
									w-14 h-14
									rounded-2xl
									bg-orange-500/10
									border border-orange-500/20
									flex items-center justify-center
									mx-auto mb-5
								"
							>
								<PackageCheck className="w-7 h-7 text-orange-400" />
							</div>

							<h2 className="text-xl font-semibold text-white">
								No orders yet
							</h2>

							<p className="text-gray-400 mt-2 text-sm">
								Start ordering your favorite meals.
							</p>
						</div>
					) : (
						<div className="space-y-5">
							{orders.map((order) => {
								const currentStep = getCurrentStep(order.status);

								return (
									<div
										key={order._id}
										className="
											rounded-3xl
											border border-white/10
											bg-white/[0.03]
											backdrop-blur-xl
											p-5 md:p-6
										"
									>
										{/* TOP */}

										<div
											className="
												flex
												flex-col
												md:flex-row
												md:items-start
												md:justify-between
												gap-5
											"
										>
											<div>
												<div className="flex items-center gap-2 flex-wrap">
													<h2
														className="
															text-lg
															font-semibold
															text-white
														"
													>
														Order #{order._id.slice(-6)}
													</h2>

													<div
														className={`
															px-3 py-1
															rounded-full
															text-xs
															font-medium
															border
															${getStatusStyle(order.status)}
														`}
													>
														{order.status.replaceAll("_", " ")}
													</div>

													<div
														className={`
															px-3 py-1
															rounded-full
															text-xs
															font-medium
															border
															${
																order.paymentStatus === "paid"
																	? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
																	: "bg-red-500/10 text-red-400 border-red-500/20"
															}
														`}
													>
														<div className="flex items-center gap-1.5">
															{order.paymentMethod === "cod" ? (
																<Wallet className="w-3.5 h-3.5" />
															) : (
																<CreditCard className="w-3.5 h-3.5" />
															)}

															<span>
																{order.paymentMethod === "cod"
																	? "COD"
																	: "Razorpay"}{" "}
																• {order.paymentStatus}
															</span>
														</div>
													</div>
												</div>

												<div
													className="
														flex items-center gap-2
														text-gray-500
														text-xs
														mt-3
													"
												>
													<Clock3 className="w-3.5 h-3.5" />

													{new Date(order.createdAt).toLocaleString()}
												</div>
											</div>

											<div className="text-left md:text-right">
												<p className="text-xs text-gray-500 mb-1">Total</p>

												<h3
													className="
														text-2xl
														font-bold
														text-white
													"
												>
													₹{order.totalAmount}
												</h3>
											</div>
										</div>

										{/* ITEMS */}

										<div className="mt-6 space-y-3">
											{order.items.map((item, idx) => (
												<div
													key={idx}
													className="
														flex items-center justify-between
														bg-white/[0.03]
														border border-white/5
														rounded-2xl
														px-4 py-3
													"
												>
													<div>
														<h4
															className="
																text-sm
																font-medium
																text-white
															"
														>
															{item.name}
														</h4>

														<p
															className="
																text-xs
																text-gray-500
																mt-1
															"
														>
															Qty {item.quantity}
														</p>
													</div>

													<p
														className="
															text-sm
															font-semibold
															text-white
														"
													>
														₹{item.price * item.quantity}
													</p>
												</div>
											))}
										</div>

										{/* TRACKER */}

										<div className="mt-7">
											<div
												className="
													grid grid-cols-4
													gap-3
												"
											>
												{[
													{
														icon: PackageCheck,
														label: "Confirmed",
													},
													{
														icon: ChefHat,
														label: "Preparing",
													},
													{
														icon: Bike,
														label: "Delivery",
													},
													{
														icon: CheckCircle2,
														label: "Delivered",
													},
												].map((step, index) => {
													const active = index <= currentStep;

													const Icon = step.icon;

													return (
														<div
															key={step.label}
															className="
																flex
																flex-col
																items-center
																text-center
															"
														>
															<div
																className={`
																	w-11 h-11
																	rounded-2xl
																	border
																	flex items-center justify-center
																	transition-all
																	${
																		active
																			? "bg-orange-500 border-orange-500 text-white"
																			: "bg-white/[0.03] border-white/10 text-gray-500"
																	}
																`}
															>
																<Icon className="w-5 h-5" />
															</div>

															<p
																className={`
																	mt-2
																	text-[11px]
																	font-medium
																	${active ? "text-white" : "text-gray-500"}
																`}
															>
																{step.label}
															</p>
														</div>
													);
												})}
											</div>
										</div>

										{/* ADDRESS */}

										<div
											className="
												mt-7
												pt-5
												border-t border-white/10
												flex items-start gap-3
											"
										>
											<div
												className="
													w-10 h-10
													rounded-xl
													bg-orange-500/10
													border border-orange-500/20
													flex items-center justify-center
													shrink-0
												"
											>
												<MapPin className="w-4 h-4 text-orange-400" />
											</div>

											<div>
												<p
													className="
														text-sm
														font-medium
														text-white
														mb-1
													"
												>
													Delivery Address
												</p>

												<p
													className="
														text-sm
														text-gray-400
														leading-relaxed
													"
												>
													{order.address?.street}, {order.address?.city},{" "}
													{order.address?.state} - {order.address?.pincode}
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
				<Footer />
		</ProtectedRoute>
	);
}
