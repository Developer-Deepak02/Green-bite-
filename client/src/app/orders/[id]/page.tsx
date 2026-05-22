"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import {
	ArrowLeft,
	MapPin,
	Clock3,
	CreditCard,
	PackageCheck,
	CheckCircle2,
	ChefHat,
	Bike,
	Package,
} from "lucide-react";

interface OrderItem {
	name: string;
	price: number;
	quantity: number;
	image?: string;
	menuItemId?: string;
}

interface Order {
	_id: string;
	status: string;
	paymentMethod: string;
	paymentStatus: string;
	totalAmount: number;
	createdAt: string;

	address: {
		fullName: string;
		phone: string;
		street: string;
		city: string;
		state: string;
		pincode: string;
	};

	items: OrderItem[];
}

export default function OrderDetailsPage() {
	const params = useParams();

	const [order, setOrder] = useState<Order | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch(
					`http://localhost:5000/api/orders/${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				const data = await res.json();

				setOrder(data.order);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchOrder();
		}
	}, [params.id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817] text-white">
				<Navbar />

				<div className="max-w-5xl mx-auto px-4 py-10">
					<div className="animate-pulse space-y-6">
						<div className="h-12 rounded-2xl bg-white/5" />

						<div className="h-72 rounded-[32px] bg-white/5" />

						<div className="h-60 rounded-[32px] bg-white/5" />
					</div>
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="min-h-screen bg-[#020817] flex items-center justify-center text-white">
				Order not found
			</div>
		);
	}

	const steps = [
		{
			key: "confirmed",
			label: "Confirmed",
			icon: Package,
		},
		{
			key: "preparing",
			label: "Preparing",
			icon: ChefHat,
		},
		{
			key: "out_for_delivery",
			label: "Out For Delivery",
			icon: Bike,
		},
		{
			key: "delivered",
			label: "Delivered",
			icon: CheckCircle2,
		},
	];

	const currentStepIndex = steps.findIndex((step) => step.key === order.status);

	return (
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			<Navbar />

			{/* BG */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-10">
				{/* BACK */}

				<Link
					href="/orders"
					className="
						inline-flex
						items-center
						gap-2
						text-gray-400
						hover:text-white
						transition-colors
						mb-8
					"
				>
					<ArrowLeft className="w-4 h-4" />
					Back To Orders
				</Link>

				{/* HEADER */}

				<div
					className="
						rounded-[36px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-6 md:p-8
						mb-6
					"
				>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div>
							<p className="text-orange-400 font-medium text-sm">
								Order Details
							</p>

							<h1 className="text-4xl font-black mt-2">
								Order #{String(order._id).slice(-6)}
							</h1>

							<div className="flex items-center gap-2 text-gray-400 mt-4">
								<Clock3 className="w-4 h-4" />

								<span>{new Date(order.createdAt).toLocaleString()}</span>
							</div>
						</div>

						<div className="text-right">
							<p className="text-sm text-gray-400">Total Amount</p>

							<h2 className="text-5xl font-black text-orange-500 mt-2">
								₹{order.totalAmount}
							</h2>
						</div>
					</div>

					{/* BADGES */}

					<div className="flex flex-wrap items-center gap-3 mt-8">
						<div className="px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium capitalize">
							{order.status.replaceAll("_", " ")}
						</div>

						<div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium capitalize">
							{order.paymentStatus}
						</div>

						<div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-300 text-sm font-medium flex items-center gap-2 capitalize">
							<CreditCard className="w-4 h-4" />
							{order.paymentMethod}
						</div>
					</div>
				</div>

				{/* ORDER STATUS */}

				<div
					className="
						rounded-[36px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-6 md:p-8
						mb-6
					"
				>
					<div className="flex items-center justify-between mb-10">
						<h2 className="text-2xl font-bold">Order Status</h2>

						<p className="text-orange-400 font-semibold capitalize">
							{order.status.replaceAll("_", " ")}
						</p>
					</div>

					<div className="relative">
						{/* LINE */}

						<div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/10" />

						<div
							className="hidden md:block absolute top-8 left-[10%] h-[2px] bg-orange-500 transition-all duration-500"
							style={{
								width:
									currentStepIndex === 0
										? "0%"
										: currentStepIndex === 1
											? "27%"
											: currentStepIndex === 2
												? "54%"
												: "80%",
							}}
						/>

						<div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
							{steps.map((step, index) => {
								const completed = index <= currentStepIndex;

								const Icon = step.icon;

								return (
									<div
										key={step.key}
										className="flex flex-col items-center text-center"
									>
										<div
											className={`
												w-16 h-16 rounded-2xl
												border flex items-center justify-center
												transition-all duration-300
												z-10
												${
													completed
														? `
															bg-orange-500
															border-orange-500
															text-white
															shadow-lg
															shadow-orange-500/30
														`
														: `
															bg-[#0b1220]
															border-white/10
															text-gray-500
														`
												}
											`}
										>
											<Icon className="w-7 h-7" />
										</div>

										<div className="mt-4">
											<p
												className={`
													font-semibold
													${completed ? "text-white" : "text-gray-500"}
												`}
											>
												{step.label}
											</p>

											<p className="text-xs text-gray-500 mt-1">
												Step {index + 1}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* ITEMS */}

				<div
					className="
						rounded-[36px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-6 md:p-8
						mb-6
					"
				>
					<div className="flex items-center gap-3 mb-8">
						<div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
							<PackageCheck className="w-6 h-6 text-orange-400" />
						</div>

						<div>
							<h2 className="text-2xl font-bold">Order Items</h2>

							<p className="text-gray-400 text-sm mt-1">
								Items included in this order
							</p>
						</div>
					</div>

					<div className="space-y-4">
						{Array.isArray(order.items) &&
							order.items.map((item, index) => (
								<div
									key={index}
									className="
										flex items-center justify-between
										gap-4
										p-4
										rounded-3xl
										bg-white/[0.03]
										border border-white/10
									"
								>
									<div className="flex items-center gap-4">
										<div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
											<Image
												src={item.image || "/placeholder-food.jpg"}
												alt={item.name}
												fill
												className="object-cover"
											/>
										</div>

										<div>
											<h3 className="text-lg font-semibold">{item.name}</h3>

											<p className="text-gray-400 text-sm mt-1">
												Qty: {item.quantity}
											</p>
										</div>
									</div>

									<div className="text-right">
										<p className="text-orange-400 font-bold text-lg">
											₹{item.price * item.quantity}
										</p>

										<p className="text-gray-500 text-sm mt-1">
											₹{item.price} each
										</p>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* ADDRESS */}

				<div
					className="
						rounded-[36px]
						border border-white/10
						bg-white/[0.03]
						backdrop-blur-2xl
						p-6 md:p-8
					"
				>
					<div className="flex items-center gap-3 mb-8">
						<div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
							<MapPin className="w-6 h-6 text-orange-400" />
						</div>

						<div>
							<h2 className="text-2xl font-bold">Delivery Address</h2>

							<p className="text-gray-400 text-sm mt-1">
								Order delivery location
							</p>
						</div>
					</div>

					<div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5">
						<h3 className="text-lg font-semibold">{order.address?.fullName}</h3>

						<p className="text-gray-400 mt-3">{order.address?.street}</p>

						<p className="text-gray-400 mt-1">
							{order.address?.city}, {order.address?.state}
						</p>

						<p className="text-gray-400 mt-1">{order.address?.pincode}</p>

						<p className="text-gray-500 mt-4">{order.address?.phone}</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
