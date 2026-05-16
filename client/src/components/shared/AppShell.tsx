import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-[#0F172A] text-white">
			<Navbar />

			<main
				className="
					max-w-7xl mx-auto
					px-4 py-6
					pb-24 md:pb-6
				"
			>
				{children}
			</main>

			<MobileBottomNav />
		</div>
	);
}
