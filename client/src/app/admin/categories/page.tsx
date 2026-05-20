"use client";

import { useEffect, useState } from "react";

import {
	Plus,
	Pencil,
	Trash2,
	X,
	FolderOpen,
	CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

interface Category {
	_id: string;

	name: string;

	isActive: boolean;

	createdAt: string;
}

export default function AdminCategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([]);

	const [loading, setLoading] = useState(true);

	const [modalOpen, setModalOpen] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);

	const [deleteId, setDeleteId] = useState<string | null>(null);

	const [saving, setSaving] = useState(false);

	const [form, setForm] = useState({
		name: "",
	});

	// ================= FETCH =================

	const fetchCategories = async () => {
		try {
			setLoading(true);

			const res = await fetch("http://localhost:5000/api/categories");

			const data = await res.json();

			setCategories(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error(error);

			toast.error("Failed to fetch categories");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	// ================= OPEN ADD =================

	const openAddModal = () => {
		setSelectedCategory(null);

		setForm({
			name: "",
		});

		setModalOpen(true);
	};

	// ================= OPEN EDIT =================

	const openEditModal = (category: Category) => {
		setSelectedCategory(category);

		setForm({
			name: category.name,
		});

		setModalOpen(true);
	};

	// ================= SUBMIT =================

	const handleSubmit = async () => {
		try {
			if (!form.name.trim()) {
				toast.error("Category name is required");

				return;
			}

			setSaving(true);

			const token = localStorage.getItem("token");

			const endpoint = selectedCategory
				? `http://localhost:5000/api/categories/${selectedCategory._id}`
				: "http://localhost:5000/api/categories";

			const method = selectedCategory ? "PUT" : "POST";

			const res = await fetch(endpoint, {
				method,

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					name: form.name,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Something went wrong");

				return;
			}

			toast.success(
				selectedCategory
					? "Category updated successfully"
					: "Category created successfully",
			);

			setModalOpen(false);

			setSelectedCategory(null);

			setForm({
				name: "",
			});

			fetchCategories();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	// ================= DELETE =================

	const handleDelete = async () => {
		if (!deleteId) return;

		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/categories/${deleteId}`,
				{
					method: "DELETE",

					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to delete category");

				return;
			}

			toast.success("Category disabled successfully");

			setDeleteModal(false);

			setDeleteId(null);

			fetchCategories();
		} catch (error) {
			console.error(error);

			toast.error("Failed to delete category");
		}
	};

	// ================= LOADING =================

	if (loading) {
		return (
			<div className="p-6 md:p-8">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="
								h-[220px]
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
							Manage food categories
						</p>

						<h1 className="text-4xl font-black text-white">
							Categories Management
						</h1>
					</div>

					<button
						onClick={openAddModal}
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
						Add Category
					</button>
				</div>

				{/* EMPTY */}

				{categories.length === 0 ? (
					<div
						className="
							rounded-3xl
							border border-white/10
							bg-white/[0.03]
							p-16
							text-center
						"
					>
						<div
							className="
								w-20 h-20
								rounded-3xl
								bg-orange-500/10
								border border-orange-500/20
								mx-auto
								flex items-center justify-center
								mb-6
							"
						>
							<FolderOpen className="w-10 h-10 text-orange-400" />
						</div>

						<h2 className="text-2xl font-bold text-white">No Categories Yet</h2>

						<p className="text-gray-400 mt-3">
							Create your first food category.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{categories.map((category) => (
							<div
								key={category._id}
								className="
									rounded-[32px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-xl
									p-6
								"
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<div
											className="
												w-14 h-14
												rounded-2xl
												bg-orange-500/10
												border border-orange-500/20
												flex items-center justify-center
												mb-5
											"
										>
											<FolderOpen className="w-7 h-7 text-orange-400" />
										</div>

										<h2 className="text-2xl font-bold text-white">
											{category.name}
										</h2>

										<div
											className="
												mt-4
												inline-flex
												items-center
												gap-2
												text-emerald-400
												text-sm
											"
										>
											<CheckCircle2 className="w-4 h-4" />
											Active
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3 mt-8">
									<button
										onClick={() => openEditModal(category)}
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
										onClick={() => {
											setDeleteId(category._id);

											setDeleteModal(true);
										}}
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
						))}
					</div>
				)}
			</div>

			{/* ADD / EDIT MODAL */}

			{modalOpen && (
				<div
					className="
						fixed inset-0
						z-[120]
						bg-black/70
						backdrop-blur-md
						flex items-center justify-center
						p-4
					"
				>
					<div
						className="
							w-full
							max-w-lg
							rounded-[36px]
							border border-white/10
							bg-[#0B1220]
							p-8
						"
					>
						<div className="flex items-center justify-between mb-8">
							<div>
								<p className="text-orange-400 text-sm font-medium mb-2">
									{selectedCategory ? "Update category" : "Create category"}
								</p>

								<h2 className="text-3xl font-black text-white">
									{selectedCategory ? "Edit Category" : "Add Category"}
								</h2>
							</div>

							<button
								onClick={() => setModalOpen(false)}
								className="
									w-11 h-11
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
									text-white
									flex items-center justify-center
								"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="space-y-5">
							<input
								type="text"
								placeholder="Category name"
								value={form.name}
								onChange={(e) =>
									setForm({
										name: e.target.value,
									})
								}
								className="
									w-full
									h-14
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
									px-5
									text-white
									outline-none
								"
							/>

							<button
								onClick={handleSubmit}
								disabled={saving}
								className="
									w-full
									h-14
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									disabled:opacity-50
									text-white
									font-semibold
									transition-all duration-300
								"
							>
								{saving
									? selectedCategory
										? "Updating..."
										: "Creating..."
									: selectedCategory
										? "Update Category"
										: "Create Category"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* DELETE MODAL */}

			{deleteModal && (
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
							<h2 className="text-2xl font-bold text-white">Delete Category</h2>

							<button
								onClick={() => setDeleteModal(false)}
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
							Are you sure you want to disable this category?
						</p>

						<div className="grid grid-cols-2 gap-4 mt-8">
							<button
								onClick={() => setDeleteModal(false)}
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
								className="
									h-12
									rounded-2xl
									bg-red-500
									hover:bg-red-600
									text-white
									font-medium
									transition-all
								"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
