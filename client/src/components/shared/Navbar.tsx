"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { ShoppingCart, User, Menu, Search, HandPlatter, X } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
	const pathname = usePathname();

	const [mobileOpen, setMobileOpen] = useState(false);

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

	return (
		<header
			className="
				sticky top-0 z-50
				backdrop-blur-xl
				bg-[#0B1220]/80
				border-b border-gray-800
			"
		>
			<div
				className="
					max-w-7xl mx-auto
					h-16
					px-4
					flex items-center justify-between
				"
			>
				{/* LEFT */}
				<Link href="/" className="flex items-center gap-3 group">
					<div
						className="
							w-11 h-11
							rounded-2xl
							bg-gradient-to-br
							from-orange-400
							to-orange-600
							flex items-center justify-center
							shadow-lg shadow-orange-500/20
							group-hover:scale-105
							transition-all duration-300
						"
					>
						<HandPlatter className="w-5 h-5 text-white" />
					</div>

					<div className="leading-tight">
						<h1
							className="
								text-2xl
								font-black
								tracking-tight
								text-white
							"
						>
							Green
							<span className="text-orange-500">bite</span>
						</h1>

						<p
							className="
								text-[11px]
								text-gray-400
								uppercase
								tracking-[0.2em]
								-mt-1
							"
						>
							Food Delivery
						</p>
					</div>
				</Link>

				{/* CENTER NAV */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => {
						const active = pathname === link.href;

						return (
							<Link
								key={link.name}
								href={link.href}
								className={`
									text-sm font-medium
									transition-colors duration-200
									hover:text-white
									${active ? "text-orange-500" : "text-gray-300"}
								`}
							>
								{link.name}
							</Link>
						);
					})}
				</nav>

				{/* RIGHT */}
				<div className="flex items-center gap-3">
					{/* Search */}
					<button
						className="
							hidden sm:flex
							w-11 h-11
							rounded-xl
							cursor-pointer
							bg-white/5
							border border-white/5
							items-center justify-center
							text-gray-300
							hover:bg-white/10
							hover:text-white
							transition-all duration-300
						"
					>
						<Search className="w-5 h-5" />
					</button>

					{/* Cart */}
					<Link
						href="/cart"
						className="
							relative
							w-11 h-11
							rounded-xl
							bg-white/5
							border border-white/5
							flex items-center justify-center
							text-gray-300
							hover:bg-white/10
							hover:text-white
							transition-all duration-300
						"
					>
						<ShoppingCart className="w-5 h-5" />

						{totalItems > 0 && (
							<span
								className="
									absolute -top-1 -right-1
									bg-orange-500
									text-white
									text-[10px]
									font-bold
									min-w-[18px]
									h-[18px]
									rounded-full
									flex items-center justify-center
									px-1
								"
							>
								{totalItems}
							</span>
						)}
					</Link>

					{/* Sign In */}
					<Link
						href="/login"
						className="
							hidden sm:flex
							items-center gap-2
							px-5 py-2.5
							rounded-full
							bg-orange-500
							text-white
							font-semibold
							text-sm
							hover:bg-orange-600
							transition-all duration-300
							shadow-lg shadow-orange-500/20
						"
					>
						<User className="w-4 h-4" />
						Sign In
					</Link>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="
							md:hidden
							w-11 h-11
							rounded-xl
							bg-white/5
							border border-white/5
							flex items-center justify-center
							text-white
						"
					>
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>

			{/* MOBILE MENU */}
			{mobileOpen && (
				<div
					className="
						md:hidden
						px-4 pb-4
						bg-[#0B1220]
						border-t border-gray-800
					"
				>
					<div className="flex flex-col gap-1 pt-3">
						{navLinks.map((link) => {
							const active = pathname === link.href;

							return (
								<Link
									key={link.name}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`
										px-4 py-3
										rounded-xl
										text-sm font-medium
										transition-all
										${
											active
												? "text-orange-500 bg-white/5"
												: "text-gray-300 hover:text-white hover:bg-white/5"
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
								mt-2
								bg-orange-500
								hover:bg-orange-600
								text-white
								rounded-xl
								px-4 py-3
								text-sm font-semibold
								text-center
								transition-all duration-300
							"
						>
							Sign In
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
