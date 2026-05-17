import type { Metadata } from "next";
import { Poppins, Inter, Geist } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-heading",
});

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	title: "BiteRush",
	description: "Modern Food Delivery App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("font-sans", geist.variable)}>
			<body
				className={`
					${poppins.variable}
					${inter.variable}
					antialiased
					bg-[#0F172A]
					text-white
					min-h-screen
					overflow-x-hidden
				`}
			>
				<div className="relative min-h-screen flex flex-col">
					<Navbar />

					<main className="flex-1">{children}</main>

					<Footer />
				</div>
			</body>
		</html>
	);
}
