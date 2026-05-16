"use client";

import Link from "next/link";
import { Home, UtensilsCrossed, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
	const pathname = usePathname();

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
		},
		{
			label: "Profile",
			href: "/login",
			icon: User,
		},
	];

	return (
		<div
			className="
				md:hidden
				fixed bottom-0 left-0 right-0
				bg-[#111827]/95
				backdrop-blur-lg
				border-t border-gray-800
				z-50
			"
		>
			<div className="grid grid-cols-4 py-2">
				{navItems.map((item) => {
					const Icon = item.icon;

					const active = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							className="
								flex flex-col items-center gap-1
								text-xs
							"
						>
							<Icon
								size={22}
								className={active ? "text-orange-500" : "text-gray-400"}
							/>

							<span className={active ? "text-orange-500" : "text-gray-400"}>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
