import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";

import "./globals.css";

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
	title: "Greenbite",
	description: "Modern Food Delivery App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`
					${poppins.variable}
					${inter.variable}
					antialiased
					bg-[#0F172A]
					text-white
					min-h-screen
				`}
			>
				{children}
			</body>
		</html>
	);
}
