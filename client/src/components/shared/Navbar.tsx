"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
	ShoppingCart,
	User,
	Menu,
	Search,
	HandPlatter,
	X,
	Home,
	UtensilsCrossed,
	LogOut,
	Heart,
	LayoutDashboard,
	Package,
	MapPin,
	ChevronDown,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishlistStore";

import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
	const pathname = usePathname();

	const router = useRouter();

	const [mobileOpen, setMobileOpen] = useState(false);

	const [scrolled, setScrolled] = useState(false);

	const [searchOpen, setSearchOpen] = useState(false);

	const [profileOpen, setProfileOpen] = useState(false);

	const items = useCartStore((state) => state.items);

	const wishlistItems = useWishlistStore((state) => state.items);

	const totalItems = items.reduce((total, item) => total + item.quantity, 0);

	const { user, logout } = useAuthStore();

	const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

	const handleLogout = () => {
		logout();

		setMobileOpen(false);

		setProfileOpen(false);

		toast.success("Logged out successfully");

		router.push("/");
	};

	const navLinks = [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Menu",
			href: "/menu",
		},
		{
			name: "Categories",
			href: "/categories",
		},
		{
			name: "Orders",
			href: "/orders",
		},

		...(user?.role === "admin"
			? [
					{
						name: "Dashboard",
						href: "/admin",
					},
				]
			: []),

		{
			name: "About",
			href: "/about",
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);

		const fetchWishlist = useWishlistStore.getState().fetchWishlist;

		fetchWishlist();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`
				sticky top-0 z-50
				w-full
				transition-all duration-300
				${
					scrolled
						? "bg-[#0B1220]/85 backdrop-blur-2xl border-b border-white/10"
						: "bg-transparent"
				}
			`}
		>
			<div
				className="
					w-full
					h-20
					px-4
					md:px-6
					xl:px-10
					2xl:px-14
					flex items-center justify-between
				"
			>
				{/* LEFT */}

				<Link
					href="/"
					className="
						flex items-center gap-4
						group
						flex-shrink-0
					"
				>
					{/* LOGO */}

					<div
						className="
							relative
							w-12 h-12
							rounded-2xl
							bg-gradient-to-br
							from-orange-400
							to-orange-600
							flex items-center justify-center
							shadow-lg shadow-orange-500/25
							group-hover:scale-105
							transition-all duration-300
							overflow-hidden
						"
					>
						<div
							className="
								absolute inset-0
								bg-white/10
								opacity-0
								group-hover:opacity-100
								transition-opacity duration-300
							"
						/>

						<HandPlatter className="w-5 h-5 text-white relative z-10" />
					</div>

					{/* BRAND */}

					<div className="leading-tight">
						<h1
							className="
								text-2xl
								font-black
								tracking-tight
								text-white
							"
						>
							Bite
							<span
								className="
									text-orange-500
									drop-shadow-[0_0_20px_rgba(249,115,22,0.35)]
								"
							>
								Rush
							</span>
						</h1>

						<p
							className="
								text-[11px]
								text-gray-500
								uppercase
								tracking-[0.22em]
								-mt-1
							"
						>
							FRESH • FAST • DELIVERED
						</p>
					</div>
				</Link>

				{/* DESKTOP NAV */}

				<nav
					className="
						hidden lg:flex
						items-center
						gap-10
					"
				>
					{navLinks.map((link) => {
						const active = pathname === link.href;

						return (
							<Link
								key={link.name}
								href={link.href}
								className={`
									relative
									text-sm
									font-medium
									transition-all duration-300
									hover:text-white
									${active ? "text-orange-500" : "text-gray-400"}
								`}
							>
								{link.name}

								{active && (
									<div
										className="
											absolute
											-top-2
											left-1/2
											-translate-x-1/2
											w-1.5 h-1.5
											rounded-full
											bg-orange-500
										"
									/>
								)}
							</Link>
						);
					})}
				</nav>

				{/* RIGHT */}

				<div className="flex items-center gap-3">
					{/* SEARCH */}

					<Button
						size="icon"
						variant="outline"
						onClick={() => setSearchOpen(true)}
						className="
							hidden sm:flex
							w-11 h-11
							rounded-2xl
							border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							text-gray-300
							hover:bg-white/10
							hover:text-white
							hover:border-white/20
						"
					>
						<Search className="w-5 h-5" />
					</Button>

					{/* WISHLIST */}

					<Link href="/wishlist">
						<Button
							size="icon"
							variant="outline"
							className="
								hidden sm:flex
								relative
								w-11 h-11
								rounded-2xl
								border-white/10
								bg-white/[0.03]
								backdrop-blur-xl
								text-gray-300
								hover:bg-white/10
								hover:text-white
								hover:border-white/20
							"
						>
							<Heart className="w-5 h-5" />

							{wishlistItems.length > 0 && (
								<div
									className="
										absolute
										-top-1
										-right-1
										min-w-[20px]
										h-5
										rounded-full
										bg-red-500
										text-white
										text-[10px]
										font-bold
										flex items-center justify-center
										px-1
									"
								>
									{wishlistItems.length}
								</div>
							)}
						</Button>
					</Link>

					{/* CART */}

					<Link href="/cart">
						<Button
							size="icon"
							variant="outline"
							className="
								hidden sm:flex
								relative
								w-11 h-11
								rounded-2xl
								border-white/10
								bg-white/[0.03]
								backdrop-blur-xl
								text-gray-300
								hover:bg-white/10
								hover:text-white
								hover:border-white/20
							"
						>
							<ShoppingCart className="w-5 h-5" />

							{totalItems > 0 && (
								<div
									className="
										absolute
										-top-1
										-right-1
										min-w-[20px]
										h-5
										rounded-full
										bg-orange-500
										text-white
										text-[10px]
										font-bold
										flex items-center justify-center
										px-1
										shadow-lg shadow-orange-500/30
									"
								>
									{totalItems}
								</div>
							)}
						</Button>
					</Link>

					{/* PROFILE */}

					{user ? (
						<div className="relative hidden sm:block">
							<button
								onClick={() => setProfileOpen((prev) => !prev)}
								className="
									h-11
									pl-3
									pr-2
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
									hover:bg-white/[0.06]
									transition-all duration-300
									flex items-center gap-3
								"
							>
								<div
									className="
										w-8 h-8
										rounded-xl
										bg-orange-500
										text-white
										font-bold
										text-sm
										flex items-center justify-center
									"
								>
									{userInitial}
								</div>

								<ChevronDown
									className={`
										w-4 h-4 text-gray-400
										transition-transform duration-300
										${profileOpen ? "rotate-180" : ""}
									`}
								/>
							</button>

							{/* DROPDOWN */}

							{profileOpen && (
								<div
									className="
										absolute
										right-0
										top-14
										w-72
										rounded-[28px]
										border border-white/10
										bg-[#0B1220]/95
										backdrop-blur-2xl
										shadow-2xl shadow-black/40
										overflow-hidden
										z-50
									"
								>
									{/* USER INFO */}

									<div className="p-5 border-b border-white/10">
										<p className="text-white font-semibold">{user.name}</p>

										<p className="text-sm text-gray-400 mt-1">{user.email}</p>
									</div>

									{/* LINKS */}

									<div className="p-2 space-y-1">
										<Link
											href="/profile"
											onClick={() => setProfileOpen(false)}
											className="
												flex
												items-center
												gap-3
												w-full
												h-12
												px-4
												rounded-2xl
												text-gray-300
												hover:bg-white/[0.05]
												hover:text-white
												transition-all duration-300
											"
										>
											<User className="w-4 h-4" />
											My Profile
										</Link>

										<Link
											href="/orders"
											onClick={() => setProfileOpen(false)}
											className="
												flex
												items-center
												gap-3
												w-full
												h-12
												px-4
												rounded-2xl
												text-gray-300
												hover:bg-white/[0.05]
												hover:text-white
												transition-all duration-300
											"
										>
											<Package className="w-4 h-4" />
											My Orders
										</Link>

										<Link
											href="/wishlist"
											onClick={() => setProfileOpen(false)}
											className="
												flex
												items-center
												gap-3
												w-full
												h-12
												px-4
												rounded-2xl
												text-gray-300
												hover:bg-white/[0.05]
												hover:text-white
												transition-all duration-300
											"
										>
											<Heart className="w-4 h-4" />
											Wishlist
										</Link>

										<Link
											href="/address"
											onClick={() => setProfileOpen(false)}
											className="
												flex
												items-center
												gap-3
												w-full
												h-12
												px-4
												rounded-2xl
												text-gray-300
												hover:bg-white/[0.05]
												hover:text-white
												transition-all duration-300
											"
										>
											<MapPin className="w-4 h-4" />
											Addresses
										</Link>

										{/* ADMIN */}

										{user.role === "admin" && (
											<Link
												href="/admin"
												onClick={() => setProfileOpen(false)}
												className="
													flex
													items-center
													gap-3
													w-full
													h-12
													px-4
													rounded-2xl
													text-orange-400
													bg-orange-500/10
													border border-orange-500/10
													hover:bg-orange-500/20
													transition-all duration-300
													mt-2
												"
											>
												<LayoutDashboard className="w-4 h-4" />
												Admin Dashboard
											</Link>
										)}
									</div>

									{/* LOGOUT */}

									<div className="p-3 border-t border-white/10">
										<button
											onClick={handleLogout}
											className="
												w-full
												h-12
												rounded-2xl
												bg-red-500/10
												border border-red-500/20
												text-red-400
												font-semibold
												hover:bg-red-500/20
												transition-all duration-300
												flex items-center justify-center gap-2
											"
										>
											<LogOut className="w-4 h-4" />
											Logout
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						<Link href="/auth/login" className="hidden sm:block">
							<Button
								className="
									h-11
									px-5
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
									shadow-lg shadow-orange-500/20
								"
							>
								<User className="w-4 h-4 mr-2" />
								Sign In
							</Button>
						</Link>
					)}

					{/* MOBILE MENU BUTTON */}

					<Button
						size="icon"
						variant="outline"
						onClick={() => setMobileOpen(!mobileOpen)}
						className="
							lg:hidden
							w-11 h-11
							rounded-2xl
							border-white/10
							bg-white/[0.03]
							backdrop-blur-xl
							text-white
						"
					>
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</Button>
				</div>
			</div>

			{/* MOBILE MENU */}

			{mobileOpen && (
				<div
					className="
						lg:hidden
						absolute
						top-20
						left-4
						right-4
						z-50
						rounded-3xl
						border border-white/10
						bg-[#0B1220]/95
						backdrop-blur-2xl
						shadow-2xl shadow-black/40
						overflow-hidden
					"
				>
					<div className="p-2 space-y-1">
						{navLinks.map((link) => {
							const active = pathname === link.href;

							let Icon;

							switch (link.name) {
								case "Home":
									Icon = Home;
									break;

								case "Menu":
									Icon = UtensilsCrossed;
									break;

								case "Orders":
									Icon = ShoppingCart;
									break;

								default:
									Icon = User;
							}

							return (
								<Link
									key={link.name}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`
										flex items-center gap-3
										h-12
										px-4
										rounded-2xl
										text-sm font-medium
										transition-all duration-300
										${
											active
												? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
												: "text-gray-300 hover:bg-white/[0.04] hover:text-white"
										}
									`}
								>
									<Icon className="w-4 h-4" />

									<span>{link.name}</span>
								</Link>
							);
						})}

						{/* WISHLIST */}

						<Link
							href="/wishlist"
							onClick={() => setMobileOpen(false)}
							className="
								flex items-center gap-3
								h-12
								px-4
								rounded-2xl
								text-sm font-medium
								text-gray-300
								hover:bg-white/[0.04]
								hover:text-white
								transition-all duration-300
							"
						>
							<Heart className="w-4 h-4" />

							<span>Wishlist</span>

							{wishlistItems.length > 0 && (
								<div
									className="
										ml-auto
										min-w-[22px]
										h-5
										rounded-full
										bg-red-500
										text-white
										text-[10px]
										font-bold
										flex items-center justify-center
										px-1
									"
								>
									{wishlistItems.length}
								</div>
							)}
						</Link>
					</div>

					{/* LOGOUT */}

					{user && (
						<div className="p-3 border-t border-white/10">
							<button
								onClick={handleLogout}
								className="
									w-full
									h-11
									rounded-2xl
									bg-red-500/10
									border border-red-500/20
									text-red-400
									font-semibold
									flex items-center justify-center gap-2
								"
							>
								<LogOut className="w-4 h-4" />
								Logout
							</button>
						</div>
					)}
				</div>
			)}

			<SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
		</header>
	);
}
