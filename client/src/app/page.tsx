import AppShell from "@/components/shared/AppShell";

export default function HomePage() {
	return (
		<AppShell>
			<div className="space-y-4">
				<h1 className="text-5xl font-heading font-bold">
					Fastest Food Delivery 🚀
				</h1>

				<p className="text-gray-400 text-lg max-w-xl">
					Order delicious food from your favorite restaurants.
				</p>
			</div>
		</AppShell>
	);
}
