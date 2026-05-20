"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
	LayoutDashboard,
	ShoppingCart,
  ShoppingBag,
	MenuSquare,
	TicketPercent,
	Users,
	Star,
	LogOut,
	X,
} from "lucide-react";

import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";

const links = [
  {
	label: "Store",
	href: "/",
	icon: ShoppingBag,
},
	{
		label: "Dashboard",
		href: "/admin",
		icon: LayoutDashboard,
	},
	{
		label: "Orders",
		href: "/admin/orders",
		icon: ShoppingCart,
	},
	{
		label: "Menu",
		href: "/admin/menu",
		icon: MenuSquare,
	},
	{
		label: "Coupons",
		href: "/admin/coupons",
		icon: TicketPercent,
	},
	{
		label: "Users",
		href: "/admin/users",
		icon: Users,
	},
	{
		label: "Reviews",
		href: "/admin/reviews",
		icon: Star,
	},
];

export default function AdminSidebar() {
	const pathname = usePathname();

	const { logout } = useAuthStore();

	const [mobileOpen, setMobileOpen] = useState(false);

	const handleLogout = () => {
		logout();

		window.location.href = "/";
	};

	return (
		<>
			{/* MOBILE TOGGLE */}

			<button
				onClick={() => setMobileOpen(true)}
				className="
					xl:hidden
					fixed
					top-5
					left-5
					z-[100]
					w-12
					h-12
					rounded-2xl
					bg-[#0B1220]
					border border-white/10
					text-white
					flex items-center justify-center
					backdrop-blur-xl
				"
			>
				<LayoutDashboard className="w-5 h-5" />
			</button>

			{/* OVERLAY */}

			{mobileOpen && (
				<div
					onClick={() => setMobileOpen(false)}
					className="
						xl:hidden
						fixed inset-0
						bg-black/60
						z-[90]
					"
				/>
			)}

			{/* SIDEBAR */}

			<aside
				className={`
					fixed
					top-0
					left-0
					h-screen
					w-[290px]
					bg-[#050B18]/95
					backdrop-blur-2xl
					border-r border-white/10
					z-[99]
					p-6
					flex flex-col
					transition-all duration-300

					${mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
				`}
			>
				{/* TOP */}

				<div className="flex items-center justify-between">
					<div>
						<p className="text-orange-400 text-sm font-medium">BiteRush</p>

						<h2 className="text-2xl font-black text-white mt-1">Admin Panel</h2>
					</div>

					<button
						onClick={() => setMobileOpen(false)}
						className="
							xl:hidden
							w-10 h-10
							rounded-xl
							bg-white/[0.03]
							border border-white/10
							text-white
							flex items-center justify-center
						"
					>
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* NAVIGATION */}

				<div className="mt-10 flex-1 space-y-2">
					{links.map((link) => {
						const Icon = link.icon;

						const active = pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMobileOpen(false)}
								className={`
									group
									flex items-center gap-4
									h-14
									px-5
									rounded-2xl
									transition-all duration-300
									border

									${
										active
											? `
												bg-orange-500/10
												border-orange-500/20
												text-orange-400
											`
											: `
												bg-transparent
												border-transparent
												text-gray-400
												hover:bg-white/[0.03]
												hover:border-white/10
												hover:text-white
											`
									}
								`}
							>
								<Icon className="w-5 h-5" />

								<span className="font-medium">{link.label}</span>
							</Link>
						);
					})}
				</div>

				{/* LOGOUT */}

				<button
					onClick={handleLogout}
					className="
						mt-6
						w-full
						h-14
						rounded-2xl
						bg-red-500/10
						border border-red-500/20
						text-red-400
						font-semibold
						flex items-center justify-center gap-3
						hover:bg-red-500/15
						transition-all duration-300
					"
				>
					<LogOut className="w-5 h-5" />
					Logout
				</button>
			</aside>
		</>
	);
}
