"use client";

import Link from "next/link";

import {
	Home,
	UtensilsCrossed,
	ShoppingCart,
	User,
	Package,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function MobileBottomNav() {
	const pathname = usePathname();

	const items = useCartStore((state) => state.items);

	const { user } = useAuthStore();

	const totalItems = items.reduce((total, item) => total + item.quantity, 0);

	const navItems = [
		{
			label: "Home",
			href: "/",
			icon: Home,
		},
		{
			label: "Menu",
			href: "/menu",
			icon: UtensilsCrossed,
		},
		{
			label: "Cart",
			href: "/cart",
			icon: ShoppingCart,
			badge: totalItems,
		},
		{
			label: user ? "Orders" : "Profile",
			href: user ? "/orders" : "/login",
			icon: user ? Package : User,
		},
	];

	return (
		<div
			className="
				md:hidden
				fixed bottom-0 left-0 right-0
				z-50
				bg-[#0F172A]/95
				backdrop-blur-2xl
				border-t border-white/10
				safe-area-pb
			"
		>
			<div
				className="
					grid grid-cols-4
					px-2 py-2
				"
			>
				{navItems.map((item) => {
					const Icon = item.icon;

					const active =
						pathname === item.href ||
						(item.href !== "/" && pathname.startsWith(item.href));

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`
								relative
								flex flex-col items-center justify-center
								gap-1
								text-xs font-medium
								transition-all duration-300
								py-1
								${active ? "text-orange-500" : "text-gray-400 hover:text-white"}
							`}
						>
							{/* ICON WRAPPER */}

							<div
								className={`
									relative
									flex items-center justify-center
									transition-all duration-300
									${
										active
											? "bg-orange-500/10 px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10"
											: ""
									}
								`}
							>
								<Icon
									size={22}
									className="
										transition-all duration-300
									"
								/>

								{/* CART BADGE */}

								{item.badge && item.badge > 0 && (
									<div
										className="
											absolute
											- top-2
											- right-2
											min-w-[18px]
											h-[18px]
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
										{item.badge}
									</div>
								)}
							</div>

							{/* LABEL */}

							<span
								className="
									text-[11px]
									tracking-wide
								"
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
