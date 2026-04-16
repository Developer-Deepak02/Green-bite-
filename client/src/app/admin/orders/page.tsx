"use client";

import { useEffect, useState } from "react";

const STATUS_STYLES: Record<string, string> = {
	pending: "bg-yellow-500",
	confirmed: "bg-blue-500",
	preparing: "bg-purple-500",
	out_for_delivery: "bg-orange-500",
	delivered: "bg-green-600",
	cancelled: "bg-red-600",
};

// Controlled flow
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
	}[];
	totalAmount: number;
	status: string;
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

	// Fetch all orders
	const fetchOrders = async () => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/orders/admin", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			setOrders(Array.isArray(data.orders) ? data.orders : []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrders();

		// Auto refresh every 5 sec
		const interval = setInterval(fetchOrders, 5000);
		return () => clearInterval(interval);
	}, []);

	// Update status 
	const updateStatus = async (orderId: string, status: string) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/orders/admin/${orderId}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ status }),
				},
			);

			const data = await res.json();

			if (!res.ok) {
				alert(data.message);
				return;
			}

			// Instant UI update 
			setOrders((prev) =>
				prev.map((o) => (o._id === orderId ? { ...o, status } : o)),
			);
		} catch (error) {
			console.error(error);
		}
	};

	// Filter logic
	const filteredOrders =
		filter === "all" ? orders : orders.filter((o) => o.status === filter);

	if (loading) return <p className="p-4">Loading...</p>;

	return (
		<div className="min-h-screen p-4 bg-background dark:bg-gray-900">
			<h1 className="text-2xl font-bold mb-6 dark:text-white">
				🛠 Admin Orders
			</h1>

			{/* Filter */}
			<select
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-700"
			>
				<option value="all">All Orders</option>
				<option value="pending">Pending</option>
				<option value="delivered">Delivered</option>
				<option value="cancelled">Cancelled</option>
			</select>

			{filteredOrders.length === 0 ? (
				<p>No orders found</p>
			) : (
				<div className="space-y-4">
					{filteredOrders.map((order) => (
						<div
							key={order._id}
							className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
						>
							{/* User */}
							<div className="text-sm text-gray-500">
								{order.user?.name || "Guest"} ({order.user?.email || "N/A"})
							</div>

							{/* Time */}
							<div className="text-xs text-gray-400">
								{new Date(order.createdAt).toLocaleString()}
							</div>

							{/* Items */}
							<div className="mt-2">
								{order.items.map((item, idx) => (
									<div key={idx}>
										{item.name} x {item.quantity}
									</div>
								))}
							</div>

							{/* Total */}
							<div className="mt-2 font-semibold">₹{order.totalAmount}</div>

							{/* Status Badge */}
							<div className="mt-2 text-sm">
								Status:{" "}
								<span
									className={`px-3 py-1 text-xs rounded-full text-white ${
										STATUS_STYLES[order.status] || "bg-gray-500"
									}`}
								>
									{order.status.replaceAll("_", " ")}
								</span>
							</div>

							{/* Status Dropdown */}
							<select
								value={order.status}
								onChange={(e) => updateStatus(order._id, e.target.value)}
								className="mt-3 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
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
					))}
				</div>
			)}
		</div>
	);
}
