"use client";

import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
	const clearCart = useCartStore((state) => state.clearCart);
	const { items, increaseQty, decreaseQty, removeFromCart } = useCartStore();

	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	// PLACE ORDER
	const handlePlaceOrder = async () => {
		try {
			const token = localStorage.getItem("token");

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
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message);
				return;
			}

			// SUCCESS
			alert("Order placed successfully 🎉");

			clearCart();
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

					{/* TOTAL */}
					<div className="mt-6 text-lg font-semibold dark:text-white">
						Total: ₹{total}
					</div>
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
