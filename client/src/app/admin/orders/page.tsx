"use client";

import { useEffect, useState } from "react";

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

const STATUS_OPTIONS = [
	"pending",
	"confirmed",
	"preparing",
	"out_for_delivery",
	"delivered",
	"cancelled",
];

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	// 📥 Fetch all orders
	const fetchOrders = async () => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/orders/admin", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (Array.isArray(data.orders)) {
				setOrders(data.orders);
			} else {
				setOrders([]);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	// 🔄 Update status
	const updateStatus = async (orderId: string, status: string) => {
		try {
			const token = localStorage.getItem("token");

			await fetch(`http://localhost:5000/api/orders/admin/${orderId}/status`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ status }),
			});

			// refresh orders
			fetchOrders();
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) return <p className="p-4">Loading...</p>;

	return (
		<div className="min-h-screen p-4 bg-background dark:bg-gray-900">
			<h1 className="text-2xl font-bold mb-6 dark:text-white">
				🛠 Admin Orders
			</h1>

			{orders.length === 0 ? (
				<p>No orders found</p>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<div
							key={order._id}
							className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
						>
							{/* 👤 User */}
							<div className="text-sm text-gray-500">
								{order.user?.name} ({order.user?.email})
							</div>

							{/* 🕒 Time */}
							<div className="text-xs text-gray-400">
								{new Date(order.createdAt).toLocaleString()}
							</div>

							{/* 🍕 Items */}
							<div className="mt-2">
								{order.items.map((item, idx) => (
									<div key={idx}>
										{item.name} x {item.quantity}
									</div>
								))}
							</div>

							{/* 💰 Total */}
							<div className="mt-2 font-semibold">₹{order.totalAmount}</div>

							{/* 🔴 Current Status */}
							<div className="mt-2 text-sm">
								Status:{" "}
								<span className="font-semibold text-primary">
									{order.status}
								</span>
							</div>

							{/* 🔄 Buttons */}
							<div className="flex flex-wrap gap-2 mt-3">
								{STATUS_OPTIONS.map((status) => (
									<button
										key={status}
										onClick={() => updateStatus(order._id, status)}
										className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded"
									>
										{status}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
