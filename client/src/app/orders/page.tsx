"use client";

import { useEffect, useState } from "react";

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
					setOrders([]); // fallback
				}
			} catch (error) {
				console.error(error);
				setOrders([]); // safety
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	if (loading) {
		return <p className="p-4">Loading orders...</p>;
	}

	return (
		<div className="min-h-screen p-4 bg-background dark:bg-gray-900">
			<h1 className="text-2xl font-heading mb-6 dark:text-white">
				📦 Your Orders
			</h1>

			{/* SAFE CHECK */}
			{!Array.isArray(orders) || orders.length === 0 ? (
				<p className="text-gray-500">No orders yet</p>
			) : (
				<div className="space-y-6">
					{orders.map((order) => (
						<div
							key={order._id}
							className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
						>
							<div className="flex justify-between mb-3">
								<span className="text-sm text-gray-500">
									{new Date(order.createdAt).toLocaleString()}
								</span>

								<span className="text-sm font-semibold text-primary">
									{order.status}
								</span>
							</div>

							<div className="space-y-2">
								{order.items?.map((item, idx) => (
									<div key={idx} className="flex justify-between">
										<span className="dark:text-white">
											{item.name} x {item.quantity}
										</span>
										<span className="text-gray-500">
											₹{item.price * item.quantity}
										</span>
									</div>
								))}
							</div>

							<div className="mt-3 font-semibold dark:text-white">
								Total: ₹{order.totalAmount}
							</div>

							<div className="mt-3 text-sm text-gray-500">
								{order.address ? (
									<>
										Deliver to: {order.address.street}, {order.address.city},{" "}
										{order.address.state} - {order.address.pincode}
									</>
								) : (
									<span className="text-red-400">
										Address not available (old order)
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
