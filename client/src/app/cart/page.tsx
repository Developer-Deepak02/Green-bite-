"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
	ArrowRight,
	MapPin,
	Minus,
	Plus,
	ShoppingBag,
	Trash2,
	Ticket,
	CreditCard,
	Wallet,
	X,
	CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

declare global {
	interface Window {
		Razorpay: any;
	}
}

export default function CartPage() {
	const { items, increaseQty, decreaseQty, removeFromCart, clearCart } =
		useCartStore();

	const [addresses, setAddresses] = useState<any[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

	const [loadingOrder, setLoadingOrder] = useState(false);

	const [promoCode, setPromoCode] = useState("");

	const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">(
		"razorpay",
	);

	/* COUPON STATES */

	const [couponLoading, setCouponLoading] = useState(false);

	const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

	const [discountAmount, setDiscountAmount] = useState(0);

	/* TOTALS */

	const subtotal = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	const gst = Math.round(subtotal * 0.05);

	const platformFee = 12;

	const deliveryFee = subtotal > 499 ? 0 : 49;

	const total = subtotal + gst + platformFee + deliveryFee - discountAmount;

	/* FETCH ADDRESSES */

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch("http://localhost:5000/api/addresses", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				if (Array.isArray(data)) {
					setAddresses(data);
				} else if (Array.isArray(data.addresses)) {
					setAddresses(data.addresses);
				} else {
					setAddresses([]);
				}
			} catch (error) {
				console.error(error);
				setAddresses([]);
			}
		};

		fetchAddresses();
	}, []);

	/* APPLY COUPON */

	const applyCoupon = async () => {
		try {
			if (!promoCode.trim()) {
				toast.error("Please enter coupon code");

				return;
			}

			setCouponLoading(true);

			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/coupons/apply", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					code: promoCode,
					totalAmount: subtotal,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to apply coupon");

				setAppliedCoupon(null);

				setDiscountAmount(0);

				return;
			}

			setAppliedCoupon(data);

			setDiscountAmount(data.discountAmount);

			toast.success(`Coupon applied • You saved ₹${data.discountAmount}`);
		} catch (error) {
			console.error(error);

			toast.error("Failed to apply coupon");
		} finally {
			setCouponLoading(false);
		}
	};

	/* REMOVE COUPON */

	const removeCoupon = () => {
		setAppliedCoupon(null);

		setDiscountAmount(0);

		setPromoCode("");

		toast.success("Coupon removed");
	};

	/* PLACE ORDER */

	const handlePlaceOrder = async () => {
		if (!selectedAddress) {
			toast.error("Please select a delivery address");
			return;
		}

		try {
			setLoadingOrder(true);

			const token = localStorage.getItem("token");

			/* CREATE ORDER */

			const orderRes = await fetch("http://localhost:5000/api/orders", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					items: items.map((item) => ({
						menuItemId: item._id,
						quantity: item.quantity,
					})),

					address: selectedAddress,

					couponCode: appliedCoupon?.couponCode || undefined,

					paymentMethod,
				}),
			});

			const orderData = await orderRes.json();

			if (!orderRes.ok) {
				toast.error(orderData.message || "Failed to place order");
				return;
			}

			/* COD */

			if (paymentMethod === "cod") {
				toast.success("Order placed successfully 🎉");

				clearCart();

				setTimeout(() => {
					window.location.href = "/orders";
				}, 1200);

				return;
			}

			/* CREATE RAZORPAY ORDER */

			const razorpayRes = await fetch(
				"http://localhost:5000/api/payments/create-order",
				{
					method: "POST",

					headers: {
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					},

					body: JSON.stringify({
						orderId: orderData._id,
					}),
				},
			);

			const razorpayData = await razorpayRes.json();

			if (!razorpayRes.ok) {
				toast.error(razorpayData.message || "Payment initialization failed");

				return;
			}

			/* OPEN RAZORPAY */

			const options = {
				key: razorpayData.key,

				amount: razorpayData.amount,

				currency: razorpayData.currency,

				name: "BiteRush",

				description: "Food Order Payment",

				order_id: razorpayData.razorpayOrderId,

				handler: async function (response: any) {
					try {
						const verifyRes = await fetch(
							"http://localhost:5000/api/payments/verify",
							{
								method: "POST",

								headers: {
									"Content-Type": "application/json",

									Authorization: `Bearer ${token}`,
								},

								body: JSON.stringify({
									orderId: orderData._id,

									razorpay_order_id: response.razorpay_order_id,

									razorpay_payment_id: response.razorpay_payment_id,

									razorpay_signature: response.razorpay_signature,
								}),
							},
						);

						const verifyData = await verifyRes.json();

						if (!verifyRes.ok) {
							toast.error(verifyData.message || "Payment verification failed");

							return;
						}

						toast.success("Payment successful 🎉");

						clearCart();

						setTimeout(() => {
							window.location.href = "/orders";
						}, 1200);
					} catch (error) {
						console.error(error);

						toast.error("Payment verification failed");
					}
				},

				theme: {
					color: "#f97316",
				},

				modal: {
					ondismiss: async function () {
						await fetch("http://localhost:5000/api/payments/failure", {
							method: "POST",

							headers: {
								"Content-Type": "application/json",

								Authorization: `Bearer ${token}`,
							},

							body: JSON.stringify({
								orderId: orderData._id,
							}),
						});

						toast.error("Payment cancelled");
					},
				},
			};

			const razorpay = new window.Razorpay(options);

			razorpay.open();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setLoadingOrder(false);
		}
	};

	/* EMPTY CART */

	if (items.length === 0) {
		return (
			<section className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<div className="w-24 h-24 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
						<ShoppingBag className="w-10 h-10 text-orange-500" />
					</div>

					<h1 className="text-3xl font-bold text-white mb-3">
						Your Cart Is Empty
					</h1>

					<p className="text-gray-400">
						Add some delicious meals to your cart.
					</p>

					<button className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 h-12 rounded-2xl transition-all">
						Explore Menu
						<ArrowRight className="w-4 h-4" />
					</button>
				</div>
			</section>
		);
	}

	return (
		<ProtectedRoute>
			<section className="relative min-h-screen bg-[#020817] overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

				<div className="relative z-10 px-4 md:px-6 py-8">
					{/* HEADER */}

					<div className="max-w-7xl mx-auto mb-8">
						<div className="space-y-3">
							<div className="inline-flex items-center bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
								Your Cart
							</div>

							<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
								Ready To
								<span className="text-orange-500"> Checkout</span>
							</h1>

							<p className="text-gray-400 text-sm md:text-base max-w-2xl">
								Review your selected meals and place your order.
							</p>
						</div>
					</div>

					{/* CONTENT */}

					<div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
						{/* LEFT */}

						<div className="space-y-6">
							{/* CART ITEMS */}

							<div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[28px] p-5">
								<div className="flex items-center justify-between mb-5">
									<h2 className="text-2xl font-bold text-white">Cart Items</h2>

									<button
										onClick={() => {
											clearCart();
											toast.success("Cart cleared");
										}}
										className="text-sm text-red-400 hover:text-red-300 transition-colors"
									>
										Clear Cart
									</button>
								</div>

								<div className="space-y-4">
									{items.map((item) => (
										<div
											key={item._id}
											className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4"
										>
											<div className="flex items-center gap-4 flex-1 min-w-0">
												<div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
													<Image
														src={item.image || "/placeholder-food.jpg"}
														alt={item.name}
														fill
														className="object-cover"
													/>
												</div>

												<div className="min-w-0">
													<h3 className="text-lg font-semibold text-white line-clamp-1">
														{item.name}
													</h3>

													<p className="text-orange-400 font-semibold mt-1">
														₹{item.price}
													</p>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<button
													onClick={() => decreaseQty(item._id)}
													className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/[0.08]"
												>
													<Minus className="w-4 h-4" />
												</button>

												<div className="min-w-[34px] text-center text-white font-semibold">
													{item.quantity}
												</div>

												<button
													onClick={() => increaseQty(item._id)}
													className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white"
												>
													<Plus className="w-4 h-4" />
												</button>

												<button
													onClick={() => {
														removeFromCart(item._id);
														toast.success("Item removed from cart");
													}}
													className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 ml-1"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* ADDRESS */}

							<div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[28px] p-5">
								<div className="flex items-center justify-between mb-5">
									<div>
										<h2 className="text-2xl font-bold text-white">
											Delivery Address
										</h2>

										<p className="text-gray-400 text-sm mt-1">
											Choose delivery location
										</p>
									</div>

									<div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
										<MapPin className="w-5 h-5 text-orange-400" />
									</div>
								</div>

								{addresses.length === 0 ? (
									<div className="bg-white/[0.03] border border-dashed border-white/10 rounded-3xl p-8 text-center">
										<p className="text-gray-400 mb-5">
											No address found. Please add one.
										</p>

										<button className="h-11 px-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-medium transition-all">
											+ Add New Address
										</button>
									</div>
								) : (
									<div className="space-y-3">
										{addresses.map((addr) => (
											<div
												key={addr._id}
												onClick={() => setSelectedAddress(addr._id)}
												className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
													selectedAddress === addr._id
														? "bg-orange-500/10 border-orange-500/40"
														: "bg-white/[0.03] border-white/10 hover:border-white/20"
												}`}
											>
												<h3 className="text-base font-semibold text-white">
													{addr.fullName}
												</h3>

												<p className="text-gray-400 text-sm mt-2">
													{addr.street}, {addr.city}
												</p>

												<p className="text-gray-500 text-sm">
													{addr.state} - {addr.pincode}
												</p>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* RIGHT */}

						<div className="xl:sticky xl:top-24 h-fit">
							<div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[28px] p-5 space-y-6">
								<h2 className="text-2xl font-bold text-white">Order Summary</h2>

								{/* PROMO */}

								<div className="space-y-3">
									<div className="relative">
										<Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

										<input
											type="text"
											placeholder="Promo code"
											value={promoCode}
											onChange={(e) =>
												setPromoCode(e.target.value.toUpperCase())
											}
											disabled={!!appliedCoupon}
											className="
												w-full
												h-12
												rounded-2xl
												bg-white/[0.03]
												border border-white/10
												pl-11
												pr-24
												text-white
												placeholder:text-gray-500
												outline-none
												focus:border-orange-500/40
												disabled:opacity-60
											"
										/>

										{!appliedCoupon ? (
											<button
												onClick={applyCoupon}
												disabled={couponLoading}
												className="
													absolute
													right-3
													top-1/2
													-translate-y-1/2
													text-sm
													font-semibold
													text-orange-400
													hover:text-orange-300
													disabled:opacity-50
												"
											>
												{couponLoading ? "Applying..." : "Apply"}
											</button>
										) : (
											<button
												onClick={removeCoupon}
												className="
													absolute
													right-3
													top-1/2
													-translate-y-1/2
													w-8
													h-8
													rounded-xl
													bg-red-500/10
													border border-red-500/20
													text-red-400
													flex items-center justify-center
												"
											>
												<X className="w-4 h-4" />
											</button>
										)}
									</div>

									{appliedCoupon && (
										<div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4">
											<div className="flex items-start gap-3">
												<div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
													<CheckCircle2 className="w-5 h-5 text-green-400" />
												</div>

												<div>
													<p className="text-sm font-semibold text-green-400">
														Coupon Applied
													</p>

													<p className="text-white font-semibold mt-1">
														{appliedCoupon.couponCode}
													</p>

													<p className="text-sm text-green-300 mt-1">
														You saved ₹{discountAmount}
													</p>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* PAYMENT METHOD */}

								<div className="space-y-3">
									<p className="text-sm font-semibold text-white">
										Payment Method
									</p>

									<div className="grid grid-cols-2 gap-3">
										<button
											onClick={() => setPaymentMethod("razorpay")}
											className={`h-14 rounded-2xl border flex items-center justify-center gap-2 font-medium transition-all ${
												paymentMethod === "razorpay"
													? "bg-orange-500/10 border-orange-500/40 text-orange-400"
													: "bg-white/[0.03] border-white/10 text-gray-400"
											}`}
										>
											<CreditCard className="w-4 h-4" />
											Razorpay
										</button>

										<button
											onClick={() => setPaymentMethod("cod")}
											className={`h-14 rounded-2xl border flex items-center justify-center gap-2 font-medium transition-all ${
												paymentMethod === "cod"
													? "bg-orange-500/10 border-orange-500/40 text-orange-400"
													: "bg-white/[0.03] border-white/10 text-gray-400"
											}`}
										>
											<Wallet className="w-4 h-4" />
											COD
										</button>
									</div>
								</div>

								{/* PRICE */}

								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-gray-400">Subtotal</span>

										<span className="text-white font-semibold">
											₹{subtotal}
										</span>
									</div>

									<div className="flex items-center justify-between">
										<div>
											<p className="text-gray-400">GST & Taxes</p>

											<p className="text-[11px] text-gray-500 mt-1">
												5% government tax
											</p>
										</div>

										<span className="text-white font-semibold">₹{gst}</span>
									</div>

									<div className="flex items-center justify-between">
										<div>
											<p className="text-gray-400">Platform Fee</p>

											<p className="text-[11px] text-gray-500 mt-1">
												Secure handling charges
											</p>
										</div>

										<span className="text-white font-semibold">
											₹{platformFee}
										</span>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<span className="text-gray-400">Delivery Fee</span>

											{deliveryFee === 0 && (
												<div className="text-[11px] font-semibold px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
													Free Delivery
												</div>
											)}
										</div>

										<span className="text-white font-semibold">
											{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
										</span>
									</div>

									{/* DISCOUNT */}

									{discountAmount > 0 && (
										<div className="flex items-center justify-between">
											<div>
												<p className="text-green-400">Coupon Discount</p>

												<p className="text-[11px] text-green-500 mt-1">
													Applied coupon savings
												</p>
											</div>

											<span className="text-green-400 font-bold">
												- ₹{discountAmount}
											</span>
										</div>
									)}

									{deliveryFee === 0 && (
										<div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-3">
											<p className="text-sm text-green-400 font-medium">
												🎉 You saved ₹49 on delivery
											</p>
										</div>
									)}

									<div className="border-t border-white/10 pt-5 flex items-center justify-between">
										<div>
											<p className="text-xl font-bold text-white">
												Grand Total
											</p>

											<p className="text-xs text-gray-500 mt-1">
												Including all taxes & charges
											</p>
										</div>

										<div className="text-right">
											<p className="text-3xl font-black text-orange-500">
												₹{total}
											</p>

											<p className="text-xs text-gray-500 mt-1">
												Secure checkout
											</p>
										</div>
									</div>
								</div>

								{/* BUTTON */}

								<button
									onClick={handlePlaceOrder}
									disabled={!selectedAddress || loadingOrder}
									className={`
									w-full
									h-14
									rounded-2xl
									font-semibold
									text-white
									transition-all
									duration-300
									flex items-center justify-center gap-2
									${
										!selectedAddress
											? `
												bg-orange-500/40
												opacity-50
												cursor-not-allowed
											`
											: `
												bg-orange-500
												hover:bg-orange-600
												shadow-xl
												shadow-orange-500/20
											`
									}
								`}
								>
									{loadingOrder
										? "Placing Order..."
										: !selectedAddress
											? "Select Address to Continue"
											: paymentMethod === "cod"
												? "Place COD Order"
												: "Pay With Razorpay"}

									<ArrowRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</ProtectedRoute>
	);
}
