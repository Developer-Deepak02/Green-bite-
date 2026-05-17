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

					const active = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`
								flex flex-col items-center justify-center
								gap-1
								text-xs font-medium
								transition-all duration-300
								py-1
								${active ? "text-orange-500" : "text-gray-400 hover:text-white"}
							`}
						>
							{/* Icon Wrapper */}
							<div
								className={`
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
							</div>

							{/* Label */}
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
	