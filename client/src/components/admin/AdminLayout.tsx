"use client";

import { ReactNode } from "react";

import AdminSidebar from "./AdminSidebar";

interface Props {
	children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
	return (
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			{/* BACKGROUND */}

			<div
				className="
					fixed
					top-0
					left-1/2
					-translate-x-1/2
					w-[1000px]
					h-[600px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			{/* SIDEBAR */}

			<AdminSidebar />

			{/* MAIN */}

			<main
				className="
					xl:pl-[290px]
					min-h-screen
				"
			>
				<div className="relative z-10">{children}</div>
			</main>
		</div>
	);
}
