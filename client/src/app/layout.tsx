import type { Metadata } from "next";
import { Poppins, Inter, Geist } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { cn } from "@/lib/utils";

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
					bg-[#081028]
					text-white
					min-h-screen
				`}
			>
				{/* RAZORPAY SDK */}
				<Script
					src="https://checkout.razorpay.com/v1/checkout.js"
					strategy="beforeInteractive"
				/>

				{children}
			</body>
		</html>
	);
}
	