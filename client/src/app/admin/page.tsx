"use client";

import { useEffect, useState } from "react";

import {
	ShoppingBag,
	Users,
	IndianRupee,
	UtensilsCrossed,
	Clock3,
	CheckCircle2,
	Truck,
	XCircle,
} from "lucide-react";

import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	LineChart,
	Line,
} from "recharts";

interface DashboardData {
	overview: {
		totalOrders: number;
		totalUsers: number;
		totalMenuItems: number;
		totalRevenue: number;
	};

	orderStats: {
		pendingOrders: number;
		confirmedOrders: number;
		preparingOrders: number;
		outForDeliveryOrders: number;
		deliveredOrders: number;
		cancelledOrders: number;
	};

	topSellingItems: {
		_id: string;
		totalSold: number;
		totalRevenue: number;
	}[];

	recentOrders: {
		_id: string;

		totalAmount: number;

		status: string;

		user?: {
			name: string;
			email: string;
		};

		createdAt: string;
	}[];

	growthStats: {
		revenueGrowth: number;
		orderGrowth: number;
	};

	revenueAnalytics: {
		name: string;
		revenue: number;
	}[];

	ordersAnalytics: {
		name: string;
		orders: number;
	}[];
}

export default function AdminDashboardPage() {
	const [data, setData] = useState<DashboardData>({
		overview: {
			totalOrders: 0,
			totalUsers: 0,
			totalMenuItems: 0,
			totalRevenue: 0,
		},

		orderStats: {
			pendingOrders: 0,
			confirmedOrders: 0,
			preparingOrders: 0,
			outForDeliveryOrders: 0,
			deliveredOrders: 0,
			cancelledOrders: 0,
		},

		topSellingItems: [],

		recentOrders: [],

		growthStats: {
			revenueGrowth: 0,
			orderGrowth: 0,
		},

		revenueAnalytics: [],

		ordersAnalytics: [],
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDashboard = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch("http://localhost:5000/api/admin/dashboard", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const result = await res.json();

				if (result?.overview) {
					setData(result);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboard();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817] p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="
								h-40
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

	const cards = [
		{
			title: "Total Revenue",
			value: `₹${data.overview.totalRevenue}`,
			icon: IndianRupee,
			growth: data.growthStats.revenueGrowth,
		},
		{
			title: "Total Orders",
			value: data.overview.totalOrders,
			icon: ShoppingBag,
			growth: data.growthStats.orderGrowth,
		},
		{
			title: "Users",
			value: data.overview.totalUsers,
			icon: Users,
		},
		{
			title: "Menu Items",
			value: data.overview.totalMenuItems,
			icon: UtensilsCrossed,
		},
	];

	return (
		<div className="min-h-screen bg-[#020817] text-white">
			{/* BG */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			<div className="relative z-10 p-6 md:p-8">
				{/* HEADER */}

				<div className="mb-10">
					<p className="text-orange-400 text-sm font-medium mb-3">
						BiteRush Admin Panel
					</p>

					<h1 className="text-4xl font-black tracking-tight">
						Analytics Dashboard
					</h1>
				</div>

				{/* TOP CARDS */}

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
					{cards.map((card) => {
						const Icon = card.icon;

						return (
							<div
								key={card.title}
								className="
									rounded-3xl
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-xl
									p-6
								"
							>
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm">{card.title}</p>

										<h2 className="text-3xl font-black mt-3">{card.value}</h2>

										{typeof card.growth === "number" && (
											<p
												className={`
													text-sm
													mt-4
													font-medium
													${card.growth >= 0 ? "text-emerald-400" : "text-red-400"}
												`}
											>
												{card.growth >= 0 ? "↗" : "↘"} {Math.abs(card.growth)}%
												this week
											</p>
										)}
									</div>

									<div
										className="
											w-14 h-14
											rounded-2xl
											bg-orange-500/10
											border border-orange-500/20
											flex items-center justify-center
										"
									>
										<Icon className="w-6 h-6 text-orange-400" />
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* ORDER STATUS */}

				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-10">
					{[
						{
							label: "Pending",
							value: data.orderStats.pendingOrders,
							icon: Clock3,
							color: "text-yellow-400",
						},
						{
							label: "Confirmed",
							value: data.orderStats.confirmedOrders,
							icon: CheckCircle2,
							color: "text-blue-400",
						},
						{
							label: "Preparing",
							value: data.orderStats.preparingOrders,
							icon: UtensilsCrossed,
							color: "text-orange-400",
						},
						{
							label: "Delivery",
							value: data.orderStats.outForDeliveryOrders,
							icon: Truck,
							color: "text-sky-400",
						},
						{
							label: "Delivered",
							value: data.orderStats.deliveredOrders,
							icon: ShoppingBag,
							color: "text-emerald-400",
						},
						{
							label: "Cancelled",
							value: data.orderStats.cancelledOrders,
							icon: XCircle,
							color: "text-red-400",
						},
					].map((item) => {
						const Icon = item.icon;

						return (
							<div
								key={item.label}
								className="
									rounded-3xl
									border border-white/10
									bg-white/[0.03]
									p-5
								"
							>
								<div className="flex items-center justify-between">
									<Icon className={`w-5 h-5 ${item.color}`} />

									<span className="text-2xl font-bold">{item.value}</span>
								</div>

								<p className="text-sm text-gray-400 mt-4">{item.label}</p>
							</div>
						);
					})}
				</div>

				{/* CHARTS */}

				<div className="grid xl:grid-cols-2 gap-6 mt-10">
					{/* REVENUE */}

					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							p-6
						"
					>
						<div className="flex items-center justify-between mb-8">
							<div>
								<h2 className="text-2xl font-bold">Revenue Analytics</h2>

								<p className="text-gray-400 text-sm mt-1">
									Last 7 days revenue
								</p>
							</div>

							<div
								className="
									w-12 h-12
									rounded-2xl
									bg-orange-500/10
									border border-orange-500/20
									flex items-center justify-center
								"
							>
								<IndianRupee className="w-5 h-5 text-orange-400" />
							</div>
						</div>

						<div className="h-[320px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={data.revenueAnalytics}>
									<defs>
										<linearGradient
											id="colorRevenue"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />

											<stop offset="100%" stopColor="#f97316" stopOpacity={0} />
										</linearGradient>
									</defs>

									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255,255,255,0.05)"
									/>

									<XAxis dataKey="name" stroke="#6b7280" />

									<YAxis stroke="#6b7280" />

									<Tooltip
										contentStyle={{
											background: "#0f172a",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: "16px",
										}}
									/>

									<Area
										type="monotone"
										dataKey="revenue"
										stroke="#f97316"
										fillOpacity={1}
										fill="url(#colorRevenue)"
										strokeWidth={3}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* ORDERS */}

					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							p-6
						"
					>
						<div className="flex items-center justify-between mb-8">
							<div>
								<h2 className="text-2xl font-bold">Order Analytics</h2>

								<p className="text-gray-400 text-sm mt-1">Last 7 days orders</p>
							</div>

							<div
								className="
									w-12 h-12
									rounded-2xl
									bg-orange-500/10
									border border-orange-500/20
									flex items-center justify-center
								"
							>
								<ShoppingBag className="w-5 h-5 text-orange-400" />
							</div>
						</div>

						<div className="h-[320px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={data.ordersAnalytics}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255,255,255,0.05)"
									/>

									<XAxis dataKey="name" stroke="#6b7280" />

									<YAxis stroke="#6b7280" />

									<Tooltip
										contentStyle={{
											background: "#0f172a",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: "16px",
										}}
									/>

									<Line
										type="monotone"
										dataKey="orders"
										stroke="#f97316"
										strokeWidth={4}
										dot={{
											r: 5,
											fill: "#f97316",
										}}
										activeDot={{
											r: 8,
										}}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

				{/* LOWER SECTION */}

				<div className="grid xl:grid-cols-2 gap-6 mt-10">
					{/* TOP SELLING */}

					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							p-6
						"
					>
						<h2 className="text-2xl font-bold mb-6">Top Selling Items</h2>

						<div className="space-y-4">
							{data.topSellingItems.map((item, index) => (
								<div
									key={index}
									className="
										bg-white/[0.03]
										border border-white/5
										rounded-2xl
										p-4
									"
								>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-semibold">{item._id}</h3>

											<p className="text-sm text-gray-400 mt-1">
												{item.totalSold} sold
											</p>
										</div>

										<p className="font-bold text-orange-400">
											₹{item.totalRevenue}
										</p>
									</div>

									<div className="w-full h-2 rounded-full bg-white/5 mt-4 overflow-hidden">
										<div
											className="h-full bg-orange-500 rounded-full"
											style={{
												width: `${Math.min(item.totalSold * 10, 100)}%`,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* RECENT ORDERS */}

					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							p-6
						"
					>
						<h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

						<div className="space-y-4">
							{data.recentOrders.map((order) => (
								<div
									key={order._id}
									className="
										flex items-center justify-between
										bg-white/[0.03]
										border border-white/5
										rounded-2xl
										p-4
									"
								>
									<div>
										<h3 className="font-semibold">
											{order.user?.name || "User"}
										</h3>

										<p className="text-sm text-gray-400 mt-1">
											Order #{order._id.slice(-6)}
										</p>
									</div>

									<div className="text-right">
										<p className="font-bold">₹{order.totalAmount}</p>

										<p className="text-xs text-gray-500 mt-1 capitalize">
											{order.status.replaceAll("_", " ")}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
