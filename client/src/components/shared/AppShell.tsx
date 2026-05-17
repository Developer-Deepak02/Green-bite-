import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="
				min-h-screen
				bg-[#0F172A]
				text-white
				overflow-x-hidden
			"
		>
			{/* Top Navigation */}
			<Navbar />

			{/* Main Content */}
			<main
				className="
					w-full
					px-4
					md:px-6
					xl:px-10
					2xl:px-14
					py-6
					pb-24 md:pb-8
				"
			>
				{children}
			</main>

			<Footer />
			{/* Mobile Navigation */}
			<MobileBottomNav />

		</div>
	);
}
