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

				console.log("DASHBOARD RESPONSE:", result);

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
		},
		{
			title: "Total Orders",
			value: data.overview.totalOrders,
			icon: ShoppingBag,
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
			{/* BACKGROUND */}

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
							{data.topSellingItems.length === 0 ? (
								<div className="text-gray-400 text-sm">
									No top selling items yet
								</div>
							) : (
								data.topSellingItems.map((item, index) => (
									<div
										key={index}
										className="
											flex items-center justify-between
											bg-white/[0.03]
											border border-white/5
											rounded-2xl
											p-4
										"
									>
										<div>
											<h3 className="font-semibold">{item._id}</h3>

											<p className="text-sm text-gray-400 mt-1">
												{item.totalSold} sold
											</p>
										</div>

										<div className="text-right">
											<p className="font-bold text-orange-400">
												₹{item.totalRevenue}
											</p>
										</div>
									</div>
								))
							)}
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
							{data.recentOrders.length === 0 ? (
								<div className="text-gray-400 text-sm">
									No recent orders yet
								</div>
							) : (
								data.recentOrders.map((order) => (
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
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
