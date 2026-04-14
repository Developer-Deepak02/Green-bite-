"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartPage() {
	const { items, increaseQty, decreaseQty, removeFromCart, clearCart } =
		useCartStore();

	const [addresses, setAddresses] = useState<any[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	// Fetch addresses
	useEffect(() => {
		const fetchAddresses = async () => {
			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/addresses", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();
			setAddresses(data);
		};

		fetchAddresses();
	}, []);

	// PLACE ORDER
	const handlePlaceOrder = async () => {
		try {
			const token = localStorage.getItem("token");

			// Require address selection
			if (!selectedAddress) {
				alert("Please select an address");
				return;
			}

			const res = await fetch("http://localhost:5000/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					items: items.map((item) => ({
						name: item.name,
						price: item.price,
						quantity: item.quantity,
					})),
					totalAmount: total,
					address: selectedAddress, // Send ID (backend converts to snapshot)
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message);
				return;
			}

			alert("Order placed successfully 🎉");

			clearCart();
			setSelectedAddress(null);
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	};

	return (
		<div className="min-h-screen p-4 bg-background dark:bg-gray-900">
			<h1 className="text-2xl font-heading mb-6 dark:text-white">Your Cart</h1>

			{items.length === 0 ? (
				<p className="text-gray-500">Cart is empty</p>
			) : (
				<div className="space-y-4">
					{/* CART ITEMS */}
					{items.map((item) => (
						<div
							key={item._id}
							className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
						>
							<div>
								<h2 className="font-heading dark:text-white">{item.name}</h2>
								<p className="text-sm text-gray-500">₹{item.price}</p>
							</div>

							<div className="flex items-center gap-3">
								<button
									onClick={() => decreaseQty(item._id)}
									className="px-2 bg-gray-200 dark:bg-gray-700 rounded"
								>
									-
								</button>

								<span className="dark:text-white">{item.quantity}</span>

								<button
									onClick={() => increaseQty(item._id)}
									className="px-2 bg-gray-200 dark:bg-gray-700 rounded"
								>
									+
								</button>

								<button
									onClick={() => removeFromCart(item._id)}
									className="text-red-500 ml-3"
								>
									Remove
								</button>
							</div>
						</div>
					))}

					{/* ADDRESS SECTION */}
					<div className="mt-6">
						<h2 className="text-lg font-semibold mb-2 dark:text-white">
							Select Address
						</h2>

						{addresses.length === 0 ? (
							<p className="text-gray-500">No address found. Please add one.</p>
						) : (
							<div className="space-y-3">
								{addresses.map((addr) => (
									<div
										key={addr._id}
										onClick={() => setSelectedAddress(addr._id)}
										className={`p-3 rounded-xl cursor-pointer border transition
                    ${
											selectedAddress === addr._id
												? "border-primary bg-green-100 dark:bg-green-900"
												: "border-gray-300 dark:border-gray-600"
										}`}
									>
										<p className="font-medium dark:text-white">
											{addr.fullName}
										</p>
										<p className="text-sm text-gray-500">
											{addr.street}, {addr.city}
										</p>
										<p className="text-sm text-gray-500">
											{addr.state} - {addr.pincode}
										</p>
									</div>
								))}
							</div>
						)}
					</div>

					{/* TOTAL */}
					<div className="mt-6 text-lg font-semibold dark:text-white">
						Total: ₹{total}
					</div>

					{/* PLACE ORDER */}
					<button
						onClick={handlePlaceOrder}
						className="mt-4 w-full bg-primary hover:bg-primary-dark 
            text-white py-3 rounded-xl font-semibold transition"
					>
						Place Order
					</button>
				</div>
			)}
		</div>
	);
}
