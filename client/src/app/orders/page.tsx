"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
	Clock3,
	MapPin,
	PackageCheck,
	ChefHat,
	Bike,
	CheckCircle2,
	RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Order {
	_id: string;

	items: {
		name: string;
		price: number;
		quantity: number;
	}[];

	totalAmount: number;

	status: string;

	address?: {
		street: string;
		city: string;
		state: string;
		pincode: string;
	};

	createdAt: string;
}

const statusSteps = ["confirmed", "preparing", "out for delivery", "delivered"];

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

				if (Array.isArray(data)) {
					setOrders(data);
				} else if (Array.isArray(data.orders)) {
					setOrders(data.orders);
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
		const lower = status.toLowerCase();

		const index = statusSteps.findIndex((step) => lower.includes(step));

		return index === -1 ? 0 : index;
	};

	const getStatusColor = (status: string) => {
		const lower = status.toLowerCase();

		if (lower.includes("delivered")) {
			return "bg-green-500/15 text-green-400 border-green-500/20";
		}

		if (lower.includes("preparing")) {
			return "bg-orange-500/15 text-orange-400 border-orange-500/20";
		}

		if (lower.includes("out")) {
			return "bg-blue-500/15 text-blue-400 border-blue-500/20";
		}

		return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
	};

	if (loading) {
		return (
			<div className="min-h-screen px-4 md:px-8 xl:px-12 py-10">
				<div className="space-y-6">
					{[1, 2, 3].map((item) => (
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
		<ProtectedRoute>
			<section className="relative overflow-hidden min-h-screen">
				{/* BACKGROUND GLOW */}

			<div
				className="
					absolute
					top-0
					left-1/2
					-translate-x-1/2
					w-[900px]
					h-[500px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-10 px-4 md:px-8 xl:px-12 py-10">
				{/* HEADER */}

				<div className="max-w-4xl mb-14">
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
						Order Tracking
					</div>

					<h1
						className="
							text-5xl
							md:text-6xl
							font-black
							leading-none
							tracking-tight
						"
					>
						Your
						<span className="text-orange-500"> Orders</span>
					</h1>

					<p
						className="
							mt-5
							text-lg
							text-gray-400
							max-w-2xl
							leading-relaxed
						"
					>
						Track your recent food orders, delivery progress, and reorder your
						favorite meals anytime.
					</p>
				</div>

				{/* EMPTY */}

				{orders.length === 0 ? (
					<div
						className="
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-2xl
							rounded-[36px]
							p-12
							text-center
						"
					>
						<div
							className="
								w-20
								h-20
								mx-auto
								rounded-3xl
								bg-orange-500/10
								border border-orange-500/20
								flex items-center justify-center
								mb-6
							"
						>
							<PackageCheck className="w-10 h-10 text-orange-500" />
						</div>

						<h2 className="text-3xl font-black text-white">No Orders Yet</h2>

						<p className="mt-4 text-gray-400 max-w-md mx-auto">
							Start exploring delicious meals and place your first order from
							BiteRush.
						</p>

						<Button
							className="
								mt-8
								h-12
								px-6
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								text-white
							"
						>
							Explore Menu
						</Button>
					</div>
				) : (
					<div className="space-y-8">
						{orders.map((order) => {
							const currentStep = getCurrentStep(order.status);

							return (
								<div
									key={order._id}
									className="
										relative
										overflow-hidden
										rounded-[36px]
										border border-white/10
										bg-white/[0.03]
										backdrop-blur-2xl
										p-7
										md:p-8
									"
								>
									{/* TOP */}

									<div
										className="
											flex
											flex-col
											lg:flex-row
											lg:items-center
											lg:justify-between
											gap-6
											pb-7
											border-b border-white/10
										"
									>
										<div className="space-y-3">
											<div className="flex items-center gap-3 flex-wrap">
												<h2
													className="
														text-2xl
														font-black
														text-white
													"
												>
													Order #{order._id.slice(-6)}
												</h2>

												<div
													className={`
														px-4 py-2
														rounded-full
														text-sm
														font-semibold
														border
														${getStatusColor(order.status)}
													`}
												>
													{order.status}
												</div>
											</div>

											<div
												className="
													flex
													items-center
													gap-2
													text-gray-400
													text-sm
												"
											>
												<Clock3 className="w-4 h-4" />

												{new Date(order.createdAt).toLocaleString()}
											</div>
										</div>

										<div className="text-left lg:text-right">
											<p className="text-sm text-gray-500 mb-1">Total Amount</p>

											<h3
												className="
													text-4xl
													font-black
													text-white
												"
											>
												₹{order.totalAmount}
											</h3>
										</div>
									</div>

									{/* ITEMS */}

									<div className="py-7">
										<h3
											className="
												text-lg
												font-bold
												text-white
												mb-5
											"
										>
											Items Ordered
										</h3>

										<div className="space-y-4">
											{order.items?.map((item, idx) => (
												<div
													key={idx}
													className="
														flex
														items-center
														justify-between
														bg-white/[0.03]
														border border-white/5
														rounded-2xl
														p-4
													"
												>
													<div>
														<h4 className="font-semibold text-white">
															{item.name}
														</h4>

														<p className="text-sm text-gray-500 mt-1">
															Quantity: {item.quantity}
														</p>
													</div>

													<p
														className="
															text-lg
															font-bold
															text-white
														"
													>
														₹{item.price * item.quantity}
													</p>
												</div>
											))}
										</div>
									</div>

									{/* DELIVERY TRACK */}

									<div
										className="
											py-7
											border-t border-white/10
										"
									>
										<h3
											className="
												text-lg
												font-bold
												text-white
												mb-8
											"
										>
											Delivery Progress
										</h3>

										<div
											className="
												grid
												grid-cols-2
												md:grid-cols-4
												gap-6
											"
										>
											{[
												{
													label: "Confirmed",
													icon: PackageCheck,
												},
												{
													label: "Preparing",
													icon: ChefHat,
												},
												{
													label: "Out for Delivery",
													icon: Bike,
												},
												{
													label: "Delivered",
													icon: CheckCircle2,
												},
											].map((step, index) => {
												const active = index <= currentStep;

												const Icon = step.icon;

												return (
													<div
														key={step.label}
														className="
															relative
															flex
															flex-col
															items-center
															text-center
														"
													>
														<div
															className={`
																w-16
																h-16
																rounded-2xl
																border
																flex
																items-center
																justify-center
																transition-all
																duration-300
																${
																	active
																		? `
																			bg-orange-500
																			border-orange-500
																			text-white
																			shadow-lg shadow-orange-500/20
																		`
																		: `
																			bg-white/[0.03]
																			border-white/10
																			text-gray-500
																		`
																}
															`}
														>
															<Icon className="w-7 h-7" />
														</div>

														<p
															className={`
																mt-4
																text-sm
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
											pt-7
											border-t border-white/10
											flex
											flex-col
											lg:flex-row
											lg:items-center
											lg:justify-between
											gap-6
										"
									>
										<div className="flex items-start gap-4">
											<div
												className="
													w-12
													h-12
													rounded-2xl
													bg-orange-500/10
													border border-orange-500/20
													flex items-center justify-center
													flex-shrink-0
												"
											>
												<MapPin className="w-5 h-5 text-orange-500" />
											</div>

											<div>
												<h4 className="text-white font-semibold mb-1">
													Delivery Address
												</h4>

												{order.address ? (
													<p className="text-gray-400 leading-relaxed">
														{order.address.street}, {order.address.city},{" "}
														{order.address.state} - {order.address.pincode}
													</p>
												) : (
													<p className="text-red-400">Address unavailable</p>
												)}
											</div>
										</div>

										<Button
											className="
												h-12
												px-6
												rounded-2xl
												bg-white/[0.05]
												border border-white/10
												text-white
												hover:bg-orange-500
												hover:border-orange-500
											"
										>
											<RefreshCcw className="w-4 h-4 mr-2" />
											Reorder
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
		</ProtectedRoute>
	);
}
