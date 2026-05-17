"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, Search, HandPlatter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
export default function Navbar() {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const items = useCartStore((state) => state.items);
	const totalItems = items.reduce((total, item) => total + item.quantity, 0);
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
			name: "Offers",
			href: "/offers",
		},
		{
			name: "Orders",
			href: "/orders",
		},
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
							Fresh • Fast • Delivered
						</p>
					</div>
				</Link>

				{/* CENTER NAV */}

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

					{/* SIGN IN */}

					<Link href="/login">
						<Button
							className="
								hidden sm:flex
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
						border-t border-white/10
						bg-[#0B1220]/95
						backdrop-blur-2xl
					"
				>
					<div
						className="
							px-4
							py-5
							space-y-2
						"
					>
						{navLinks.map((link) => {
							const active = pathname === link.href;

							return (
								<Link
									key={link.name}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`
										flex items-center
										h-12
										px-4
										rounded-2xl
										text-sm
										font-medium
										transition-all duration-300
										${
											active
												? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
												: "text-gray-300 hover:bg-white/[0.03] hover:text-white"
										}
									`}
								>
									{link.name}
								</Link>
							);
						})}

						<Link
							href="/login"
							onClick={() => setMobileOpen(false)}
							className="
								block
								mt-4
							"
						>
							<Button
								className="
									w-full
									h-12
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
								"
							>
								<User className="w-4 h-4 mr-2" />
								Sign In
							</Button>
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
