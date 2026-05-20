"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { toast } from "sonner";

import AddMenuItemModal from "@/components/admin/MenuItemModal";

import { Plus, Pencil, Trash2, Clock3, Star, X } from "lucide-react";

interface MenuItem {
	_id: string;

	name: string;

	description: string;

	price: number;

	image: string;

	preparationTime: number;

	ratingAverage: number;

	isAvailable: boolean;

	category?: {
		_id: string;
		name: string;
	};
}

export default function AdminMenuPage() {
	const [items, setItems] = useState<MenuItem[]>([]);

	const [loading, setLoading] = useState(true);

	const [modalOpen, setModalOpen] = useState(false);

	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

	const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

	const [deleting, setDeleting] = useState(false);

	// ================= FETCH MENU =================

	const fetchMenu = async () => {
		try {
			setLoading(true);

			const res = await fetch("http://localhost:5000/api/menu");

			const data = await res.json();

			setItems(
				Array.isArray(data.menuItems)
					? data.menuItems
					: Array.isArray(data.items)
						? data.items
						: Array.isArray(data)
							? data
							: [],
			);
		} catch (error) {
			console.error(error);

			toast.error("Failed to fetch menu items");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMenu();
	}, []);

	// ================= DELETE =================

	const handleDelete = async () => {
		if (!deleteItemId) return;

		try {
			setDeleting(true);

			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/menu/${deleteItemId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to delete item");

				return;
			}

			setItems((prev) => prev.filter((item) => item._id !== deleteItemId));

			toast.success("Menu item deleted successfully");

			setDeleteItemId(null);
		} catch (error) {
			console.error(error);

			toast.error("Failed to delete item");
		} finally {
			setDeleting(false);
		}
	};

	// ================= LOADING =================

	if (loading) {
		return (
			<div className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div
							key={item}
							className="
								h-[420px]
								rounded-3xl
								bg-white/[0.03]
								border border-white/10
								animate-pulse
							"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="p-6 md:p-8">
				{/* HEADER */}

				<div className="flex items-center justify-between mb-10">
					<div>
						<p className="text-orange-400 text-sm font-medium mb-2">
							Manage restaurant food items
						</p>

						<h1 className="text-4xl font-black text-white">Menu Management</h1>
					</div>

					<button
						onClick={() => {
							setSelectedItem(null);
							setModalOpen(true);
						}}
						className="
							h-14
							px-6
							rounded-2xl
							bg-orange-500
							hover:bg-orange-600
							text-white
							font-semibold
							flex items-center gap-3
							shadow-xl shadow-orange-500/20
							transition-all duration-300
						"
					>
						<Plus className="w-5 h-5" />
						Add Item
					</button>
				</div>

				{/* EMPTY */}

				{items.length === 0 ? (
					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							p-16
							text-center
						"
					>
						<h2 className="text-2xl font-bold text-white">No Menu Items</h2>

						<p className="text-gray-400 mt-3">
							Start adding delicious dishes to your restaurant.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{items.map((item) => (
							<div
								key={item._id}
								className="
									group
									overflow-hidden
									rounded-[32px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-xl
								"
							>
								{/* IMAGE */}

								<div className="relative h-64 overflow-hidden">
									<Image
										src={
											item.image && item.image.startsWith("http")
												? item.image
												: "/placeholder-food.jpg"
										}
										alt={item.name}
										fill
										className="
											object-cover
											group-hover:scale-105
											transition-transform duration-700
										"
									/>

									<div
										className="
											absolute inset-0
											bg-gradient-to-t
											from-black/90
											via-black/20
											to-transparent
										"
									/>

									<div
										className={`
											absolute
											top-4
											right-4
											px-3 py-1
											rounded-full
											text-xs
											font-semibold
											border
											${
												item.isAvailable
													? `
														bg-emerald-500/10
														border-emerald-500/20
														text-emerald-400
													`
													: `
														bg-red-500/10
														border-red-500/20
														text-red-400
													`
											}
										`}
									>
										{item.isAvailable ? "Available" : "Unavailable"}
									</div>
								</div>

								{/* CONTENT */}

								<div className="p-6">
									<div className="flex items-start justify-between gap-4">
										<div>
											<h2 className="text-2xl font-bold text-white">
												{item.name}
											</h2>

											<p className="text-sm text-orange-400 mt-2">
												{item.category?.name || "Food"}
											</p>
										</div>

										<div className="text-right">
											<p className="text-2xl font-black text-white">
												₹{item.price}
											</p>
										</div>
									</div>

									<p
										className="
											mt-4
											text-sm
											text-gray-400
											line-clamp-2
											leading-relaxed
										"
									>
										{item.description}
									</p>

									{/* META */}

									<div className="flex items-center gap-4 mt-5">
										<div className="flex items-center gap-2 text-sm text-gray-400">
											<Clock3 className="w-4 h-4 text-orange-400" />
											{item.preparationTime} mins
										</div>

										<div className="flex items-center gap-2 text-sm text-gray-400">
											<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
											{item.ratingAverage?.toFixed(1) || "0"}
										</div>
									</div>

									{/* ACTIONS */}

									<div className="grid grid-cols-2 gap-3 mt-6">
										<button
											onClick={() => {
												setSelectedItem(item);
												setModalOpen(true);
											}}
											className="
												h-12
												rounded-2xl
												bg-white/[0.04]
												border border-white/10
												text-white
												font-medium
												flex items-center justify-center gap-2
												hover:bg-white/[0.08]
												transition-all duration-300
											"
										>
											<Pencil className="w-4 h-4" />
											Edit
										</button>

										<button
											onClick={() => setDeleteItemId(item._id)}
											className="
												h-12
												rounded-2xl
												bg-red-500/10
												border border-red-500/20
												text-red-400
												font-medium
												flex items-center justify-center gap-2
												hover:bg-red-500/20
												transition-all duration-300
											"
										>
											<Trash2 className="w-4 h-4" />
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* ADD / EDIT MODAL */}

			<AddMenuItemModal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setSelectedItem(null);
				}}
				onSuccess={fetchMenu}
				mode={selectedItem ? "edit" : "add"}
				editItem={selectedItem}
			/>

			{/* DELETE MODAL */}

			{deleteItemId && (
				<div
					className="
						fixed inset-0
						z-[200]
						bg-black/70
						backdrop-blur-md
						flex items-center justify-center
						p-4
					"
				>
					<div
						className="
							w-full
							max-w-md
							rounded-[32px]
							border border-white/10
							bg-[#0B1220]
							p-8
						"
					>
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold text-white">Delete Item</h2>

							<button
								onClick={() => setDeleteItemId(null)}
								className="
									w-10 h-10
									rounded-xl
									bg-white/5
									border border-white/10
									text-white
									flex items-center justify-center
								"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<p className="text-gray-400 mt-4 leading-relaxed">
							Are you sure you want to permanently delete this menu item?
						</p>

						<div className="grid grid-cols-2 gap-4 mt-8">
							<button
								onClick={() => setDeleteItemId(null)}
								className="
									h-12
									rounded-2xl
									bg-white/5
									border border-white/10
									text-white
									font-medium
								"
							>
								Cancel
							</button>

							<button
								onClick={handleDelete}
								disabled={deleting}
								className="
									h-12
									rounded-2xl
									bg-red-500
									hover:bg-red-600
									disabled:opacity-50
									text-white
									font-medium
									transition-all
								"
							>
								{deleting ? "Deleting..." : "Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
