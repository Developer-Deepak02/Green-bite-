"use client";

import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

import {
	MapPin,
	ShoppingBag,
	LogOut,
	ChevronRight,
	ShieldCheck,
	CreditCard,
	Sparkles,
	Heart,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
	const { user, logout } = useAuthStore();

	const cartItems = useCartStore((state) => state.items);

	const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

const handleLogout = () => {
	toast.success("Logged out successfully");

	logout();

	setTimeout(() => {
		window.location.href = "/";
	}, 1000);
};

	const quickActions = [
		{
			title: "My Orders",
			description: "Track current & previous orders",
			icon: ShoppingBag,
			href: "/orders",
		},
		{
			title: "Addresses",
			description: "Manage delivery locations",
			icon: MapPin,
			href: "/addresses",
		},
		{
			title: "Wishlist",
			description: "Your saved favorite meals",
			icon: Heart,
			href: "/wishlist",
		},
		{
			title: "Payments",
			description: "Razorpay & COD enabled",
			icon: CreditCard,
			href: "#",
		},
	];

	return (
		<ProtectedRoute>
			<div className="min-h-screen flex flex-col bg-[#020817] overflow-hidden">
				<Navbar />

				<main className="flex-1 relative">
					{/* BACKGROUND GLOWS */}

					<div
						className="
							absolute
							top-0
							left-1/2
							-translate-x-1/2
							w-[900px]
							h-[400px]
							bg-orange-500/10
							blur-[180px]
							rounded-full
							pointer-events-none
						"
					/>

					<div
						className="
							absolute
							top-[300px]
							right-0
							w-[400px]
							h-[400px]
							bg-orange-500/5
							blur-[150px]
							rounded-full
							pointer-events-none
						"
					/>

					<div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
						{/* HEADER */}

						<div className="mb-10">
							<div
								className="
									inline-flex
									items-center
									gap-2
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
								<Sparkles className="w-4 h-4" />
								Account Center
							</div>

							<h1
								className="
									text-4xl
									md:text-5xl
									font-black
									tracking-tight
									text-white
								"
							>
								My
								<span className="text-orange-500"> Profile</span>
							</h1>

							<p className="mt-4 text-gray-400 max-w-2xl text-base md:text-lg">
								Manage your orders, addresses, payments, and account activity.
							</p>
						</div>

						{/* HERO CARD */}

						<div
							className="
								relative
								overflow-hidden
								rounded-[36px]
								border border-white/10
								bg-gradient-to-br
								from-white/[0.06]
								to-white/[0.02]
								backdrop-blur-2xl
								p-6 md:p-8
							"
						>
							{/* HERO GLOW */}

							<div
								className="
									absolute
									top-0
									right-0
									w-[250px]
									h-[250px]
									bg-orange-500/10
									blur-[120px]
									rounded-full
								"
							/>

							<div
								className="
									relative
									z-10
									flex
									flex-col
									md:flex-row
									md:items-center
									md:justify-between
									gap-8
								"
							>
								{/* LEFT */}

								<div className="flex items-center gap-5">
									{/* AVATAR */}

									<div
										className="
											relative
											w-24 h-24
											rounded-[30px]
											bg-gradient-to-br
											from-orange-400
											to-orange-600
											flex items-center justify-center
											text-white
											text-3xl
											font-black
											shadow-2xl
											shadow-orange-500/30
											ring-4
											ring-orange-500/10
										"
									>
										{userInitial}
									</div>

									{/* INFO */}

									<div>
										<div className="flex items-center gap-3 flex-wrap">
											<h2 className="text-3xl font-black text-white">
												{user?.name}
											</h2>

											<div
												className="
													px-3 py-1
													rounded-full
													bg-orange-500/10
													border border-orange-500/20
													text-orange-400
													text-xs
													font-semibold
													tracking-wide
													uppercase
												"
											>
												{user?.role}
											</div>
										</div>

										<p className="text-gray-400 mt-2 text-base">
											{user?.email}
										</p>

										<div
											className="
												mt-5
												inline-flex
												items-center
												gap-2
												px-4 py-2
												rounded-full
												bg-emerald-500/10
												border border-emerald-500/20
												text-emerald-400
												text-sm
												font-medium
											"
										>
											<ShieldCheck className="w-4 h-4" />
											Verified Account
										</div>
									</div>
								</div>

								{/* RIGHT */}

								<div
									className="
										grid
										grid-cols-3
										gap-3
										w-full
										md:w-auto
									"
								>
									<div
										className="
											min-w-[110px]
											rounded-3xl
											bg-white/[0.04]
											border border-white/10
											p-4
										"
									>
										<p className="text-gray-500 text-xs uppercase tracking-wide">
											Cart
										</p>

										<h3 className="mt-2 text-3xl font-black text-white">
											{cartItems.length}
										</h3>
									</div>

									<div
										className="
											min-w-[110px]
											rounded-3xl
											bg-white/[0.04]
											border border-white/10
											p-4
										"
									>
										<p className="text-gray-500 text-xs uppercase tracking-wide">
											Status
										</p>

										<h3 className="mt-2 text-xl font-black text-emerald-400">
											Active
										</h3>
									</div>

									<div
										className="
											min-w-[110px]
											rounded-3xl
											bg-white/[0.04]
											border border-white/10
											p-4
										"
									>
										<p className="text-gray-500 text-xs uppercase tracking-wide">
											Account
										</p>

										<h3 className="mt-2 text-xl font-black text-white capitalize">
											{user?.role}
										</h3>
									</div>
								</div>
							</div>
						</div>

						{/* QUICK ACTIONS */}

						<div className="mt-12">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-2xl font-bold text-white">
										Quick Access
									</h2>

									<p className="text-gray-400 text-sm mt-1">
										Manage your account and activity
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{quickActions.map((action) => {
									const Icon = action.icon;

									return (
										<Link key={action.title} href={action.href}>
											<div
												className="
													group
													relative
													overflow-hidden
													rounded-[30px]
													border border-white/10
													bg-white/[0.03]
													backdrop-blur-xl
													p-6
													hover:bg-white/[0.05]
													transition-all duration-300
													hover:-translate-y-1
													cursor-pointer
												"
											>
												{/* HOVER GLOW */}

												<div
													className="
														absolute
														inset-0
														bg-orange-500/0
														group-hover:bg-orange-500/[0.03]
														transition-all duration-300
													"
												/>

												<div className="relative z-10 flex items-start justify-between">
													<div>
														<div
															className="
																w-14 h-14
																rounded-2xl
																bg-orange-500/10
																border border-orange-500/20
																flex items-center justify-center
																mb-5
															"
														>
															<Icon className="w-6 h-6 text-orange-400" />
														</div>

														<h3 className="text-xl font-bold text-white">
															{action.title}
														</h3>

														<p className="text-gray-400 mt-2 text-sm leading-relaxed">
															{action.description}
														</p>
													</div>

													<div
														className="
															w-10 h-10
															rounded-xl
															bg-white/[0.04]
															border border-white/10
															flex items-center justify-center
															group-hover:bg-orange-500
															group-hover:border-orange-500
															transition-all duration-300
														"
													>
														<ChevronRight
															className="
																w-5 h-5
																text-gray-400
																group-hover:text-white
																transition-all duration-300
															"
														/>
													</div>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>

						{/* LOGOUT */}

						<div className="mt-10">
							<button
								onClick={handleLogout}
								className="
									group
									w-full
									rounded-[32px]
									border border-red-500/20
									bg-gradient-to-r
									from-red-500/10
									to-red-500/5
									p-6
									text-left
									hover:from-red-500/15
									hover:to-red-500/10
									transition-all duration-300
								"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-5">
										<div
											className="
												w-14 h-14
												rounded-2xl
												bg-red-500/10
												border border-red-500/20
												flex items-center justify-center
											"
										>
											<LogOut className="w-6 h-6 text-red-400" />
										</div>

										<div>
											<h3 className="text-xl font-bold text-red-400">Logout</h3>

											<p className="text-gray-400 mt-1 text-sm">
												Sign out securely from your account
											</p>
										</div>
									</div>

									<div
										className="
											w-10 h-10
											rounded-xl
											bg-white/[0.04]
											border border-white/10
											flex items-center justify-center
											group-hover:bg-red-500
											group-hover:border-red-500
											transition-all duration-300
										"
									>
										<ChevronRight
											className="
												w-5 h-5
												text-gray-400
												group-hover:text-white
											"
										/>
									</div>
								</div>
							</button>
						</div>
					</div>
				</main>

				<Footer />
			</div>
		</ProtectedRoute>
	);
}
