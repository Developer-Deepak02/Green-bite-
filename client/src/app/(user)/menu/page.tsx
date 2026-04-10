import { api } from "@/lib/api";
import { MenuItem } from "@/types";

export default async function MenuPage() {
	const menu: MenuItem[] = await api.getMenu();

	return (
		<div className="p-4 bg-background min-h-screen">
			<h1 className="text-2xl font-heading mb-4">Menu</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{menu.map((item) => (
					<div key={item._id} className="bg-white rounded-2xl shadow p-4">
						<h2 className="font-heading text-lg">{item.name}</h2>
						<p className="text-sm text-gray-500">{item.description}</p>

						<div className="mt-2 flex justify-between items-center">
							<span className="text-primary font-semibold">₹{item.price}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
