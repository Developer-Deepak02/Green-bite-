"use client";

import { useEffect, useState } from "react";

import {
	Clock3,
	CheckCircle2,
	ChefHat,
	Bike,
	XCircle,
	Package,
	RefreshCcw,
	IndianRupee,
} from "lucide-react";

import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
	pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",

	confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/20",

	preparing: "bg-purple-500/15 text-purple-400 border-purple-500/20",

	out_for_delivery: "bg-orange-500/15 text-orange-400 border-orange-500/20",

	delivered: "bg-green-500/15 text-green-400 border-green-500/20",

	cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};

const PAYMENT_STYLES: Record<string, string> = {
	paid: "bg-green-500/15 text-green-400 border-green-500/20",

	pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",

	failed: "bg-red-500/15 text-red-400 border-red-500/20",
};

const STATUS_FLOW: Record<string, string[]> = {
	pending: ["confirmed", "cancelled"],

	confirmed: ["preparing", "cancelled"],

	preparing: ["out_for_delivery"],

	out_for_delivery: ["delivered"],

	delivered: [],

	cancelled: [],
};

interface Order {
	_id: string;

	items: {
		name: string;
		quantity: number;
		price?: number;
	}[];

	totalAmount: number;

	status: string;

	paymentStatus?: string;

	paymentMethod?: string;

	address?: {
		street?: string;
		city?: string;
		state?: string;
		pincode?: string;
	};

	user?: {
		name: string;
		email: string;
	};

	createdAt: string;
}

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("all");
	const [refreshing, setRefreshing] = useState(false);
	const [updatingId, setUpdatingId] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const fetchOrders = async (showRefresh = false) => {
		try {
			if (showRefresh) {
				setRefreshing(true);
			}
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:5000/api/orders/admin", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			if (!res.ok) {
				toast.error(data.message || "Failed to fetch orders");
				return;
			}
			setOrders(Array.isArray(data.orders) ? data.orders : []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch orders");
		} finally {
			setLoading(false);

			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchOrders();

		const interval = setInterval(() => {
			fetchOrders();
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const updateStatus = async (orderId: string, status: string) => {
		try {
			setUpdatingId(orderId);

			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/orders/admin/${orderId}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						status,
					}),
				},
			);
			const data = await res.json();
			if (!res.ok) {
				toast.error(data.message || "Failed to update order");
				return;
			}
			setOrders((prev) =>
				prev.map((o) =>
					o._id === orderId
						? {
								...o,
								status,
								paymentStatus:
									status === "delivered"
										? "paid"
										: status === "cancelled"
											? "failed"
											: o.paymentStatus,
							}
						: o,
				),
			);
			toast.success("Order status updated");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setUpdatingId(null);
		}
	};

	const filteredOrders = orders.filter((order) => {
		// STATUS FILTER
		const matchesStatus = filter === "all" || order.status === filter;
		// SEARCH FILTER
		const searchLower = search.toLowerCase();
		const matchesSearch =
			order._id.toLowerCase().includes(searchLower) ||
			order.user?.name?.toLowerCase().includes(searchLower) ||
			order.user?.email?.toLowerCase().includes(searchLower) ||
			order.status.toLowerCase().includes(searchLower) ||
			order.paymentMethod?.toLowerCase().includes(searchLower) ||
			order.items.some((item) => item.name.toLowerCase().includes(searchLower));
		return matchesStatus && matchesSearch;
	});

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return Clock3;
			case "confirmed":
				return CheckCircle2;
			case "preparing":
				return ChefHat;
			case "out_for_delivery":
				return Bike;
			case "delivered":
				return Package;
			case "cancelled":
				return XCircle;
			default:
				return Clock3;
		}
	};
	const totalRevenue = orders.reduce(
		(total, order) =>
			order.paymentStatus === "paid" ? total + order.totalAmount : total,
		0,
	);
	const pendingOrders = orders.filter(
		(order) => order.status === "pending",
	).length;
	const preparingOrders = orders.filter(
		(order) => order.status === "preparing",
	).length;
	const deliveredOrders = orders.filter(
		(order) => order.status === "delivered",
	).length;
	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817] p-6">
				<div className="space-y-5">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="
								h-[240px]
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
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			{/* BACKGROUND */}

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

			<div className="relative z-10 p-4 md:p-8">
				{/* HEADER */}

				<div
					className="
						flex
						flex-col
						lg:flex-row
						lg:items-center
						lg:justify-between
						gap-6
						mb-10
					"
				>
					<div>
						<div
							className="
								inline-flex
								items-center
								px-4 py-2
								rounded-full
								bg-orange-500/10
								border border-orange-500/20
								text-orange-400
								text-sm
								font-medium
								mb-5
							"
						>
							Order Management
						</div>

						<h1
							className="
								text-4xl
								md:text-5xl
								font-black
								tracking-tight
							"
						>
							Admin
							<span className="text-orange-500"> Orders</span>
						</h1>

						<p className="text-gray-400 mt-4 text-lg">
							Manage customer orders and delivery flow.
						</p>
					</div>

					<div className="flex items-center gap-4 flex-wrap">
						<input
							type="text"
							placeholder="Search orders..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="
		h-12
		w-[220px]
		lg:w-[300px]
		px-5
		rounded-2xl
		bg-white/[0.03]
		border border-white/10
		text-white
		placeholder:text-gray-500
		outline-none
	"
						/>

						<select
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
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
							<option value="all">All Orders</option>
							<option value="pending">Pending</option>
							<option value="confirmed">Confirmed</option>
							<option value="preparing">Preparing</option>
							<option value="out_for_delivery">Out For Delivery</option>
							<option value="delivered">Delivered</option>
							<option value="cancelled">Cancelled</option>
						</select>
						<button
							onClick={() => fetchOrders(true)}
							className="
								h-12
								px-5
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								text-white
								font-semibold
								flex items-center gap-2
								transition-all
							"
						>
							<RefreshCcw
								className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
							/>
							Refresh
						</button>
					</div>
				</div>

				{/* STATS */}

				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-500 text-sm">Total Orders</p>

						<h2 className="text-4xl font-black mt-3">{orders.length}</h2>
					</div>

					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-500 text-sm">Pending</p>

						<h2 className="text-4xl font-black mt-3 text-yellow-400">
							{pendingOrders}
						</h2>
					</div>

					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-500 text-sm">Preparing</p>

						<h2 className="text-4xl font-black mt-3 text-purple-400">
							{preparingOrders}
						</h2>
					</div>

					<div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
						<p className="text-gray-500 text-sm">Revenue</p>

						<h2 className="text-4xl font-black mt-3 text-green-400">
							₹{totalRevenue}
						</h2>
					</div>
				</div>

				{/* EMPTY */}

				{filteredOrders.length === 0 ? (
					<div
						className="
							rounded-[36px]
							border border-white/10
							bg-white/[0.03]
							p-16
							text-center
						"
					>
						<h2 className="text-3xl font-black">No Orders Found</h2>

						<p className="text-gray-400 mt-4">
							There are no orders in this category.
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{filteredOrders.map((order) => {
							const StatusIcon = getStatusIcon(order.status);

							return (
								<div
									key={order._id}
									className="
										rounded-[36px]
										border border-white/10
										bg-white/[0.03]
										backdrop-blur-2xl
										p-6 md:p-7
									"
								>
									{/* TOP */}

									<div
										className="
											flex
											flex-col
											xl:flex-row
											xl:items-start
											xl:justify-between
											gap-8
										"
									>
										<div className="flex-1">
											<div
												className="
													flex
													items-center
													gap-4
													flex-wrap
													mb-5
												"
											>
												<h2
													className="
														text-2xl
														font-black
													"
												>
													Order #{order._id.slice(-6)}
												</h2>

												<div
													className={`
														inline-flex
														items-center
														gap-2
														px-4 py-2
														rounded-full
														border
														text-sm
														font-semibold
														${STATUS_STYLES[order.status]}
													`}
												>
													<StatusIcon className="w-4 h-4" />

													{order.status.replaceAll("_", " ")}
												</div>

												<div
													className={`
														inline-flex
														items-center
														gap-2
														px-4 py-2
														rounded-full
														border
														text-sm
														font-semibold
														${PAYMENT_STYLES[order.paymentStatus || "pending"]}
													`}
												>
													{order.paymentMethod} • {order.paymentStatus}
												</div>
											</div>

											<div className="grid md:grid-cols-3 gap-5">
												<div>
													<p className="text-gray-500 text-sm mb-2">Customer</p>

													<h3 className="font-semibold text-lg">
														{order.user?.name || "Guest"}
													</h3>

													<p className="text-gray-400 text-sm mt-1">
														{order.user?.email || "N/A"}
													</p>
												</div>

												<div>
													<p className="text-gray-500 text-sm mb-2">Payment</p>

													<div className="flex items-center gap-2">
														<IndianRupee className="w-4 h-4 text-orange-400" />

														<span className="font-semibold">
															₹{order.totalAmount}
														</span>
													</div>
												</div>

												<div>
													<p className="text-gray-500 text-sm mb-2">
														Ordered At
													</p>

													<p className="text-gray-300 text-sm">
														{new Date(order.createdAt).toLocaleString()}
													</p>
												</div>
											</div>

											{/* ITEMS */}

											<div className="mt-7">
												<p className="text-gray-500 text-sm mb-4">
													Order Items
												</p>

												<div className="flex flex-wrap gap-3">
													{order.items.map((item, idx) => (
														<div
															key={idx}
															className="
																px-4 py-2
																rounded-2xl
																bg-white/[0.03]
																border border-white/10
																text-sm
															"
														>
															{item.name} x {item.quantity}
														</div>
													))}
												</div>
											</div>

											{/* ADDRESS */}

											{order.address && (
												<div className="mt-7">
													<p className="text-gray-500 text-sm mb-3">
														Delivery Address
													</p>

													<div
														className="
															rounded-2xl
															bg-white/[0.03]
															border border-white/10
															p-4
															text-sm
															text-gray-300
															leading-relaxed
														"
													>
														{order.address.street}, {order.address.city},{" "}
														{order.address.state} - {order.address.pincode}
													</div>
												</div>
											)}
										</div>

										{/* ACTIONS */}

										<div
											className="
												w-full
												xl:w-[260px]
												rounded-[28px]
												bg-[#0B1220]
												border border-white/10
												p-5
											"
										>
											<p className="text-sm text-gray-400 mb-3">
												Update Status
											</p>

											<select
												value={order.status}
												disabled={updatingId === order._id}
												onChange={(e) =>
													updateStatus(order._id, e.target.value)
												}
												className="
													w-full
													h-12
													px-4
													rounded-2xl
													bg-white/[0.03]
													border border-white/10
													text-white
													outline-none
													disabled:opacity-50
												"
											>
												<option value={order.status}>
													{order.status.replaceAll("_", " ")}
												</option>

												{STATUS_FLOW[order.status]?.map((next) => (
													<option key={next} value={next}>
														{next.replaceAll("_", " ")}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
