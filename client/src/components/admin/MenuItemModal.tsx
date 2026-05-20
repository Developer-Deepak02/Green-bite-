"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { X, Upload, Check } from "lucide-react";

interface Category {
	_id: string;
	name: string;
}

interface MenuItem {
	_id: string;
	name: string;
	description: string;
	price: number;
	preparationTime: number;
	image: string;
	isAvailable: boolean;
	category?: {
		_id: string;
		name: string;
	};
}

interface Props {
	open: boolean;
	onClose: () => void;
	onSuccess: () => void;

	mode?: "add" | "edit";

	editItem?: MenuItem | null;
}

export default function AddMenuItemModal({
	open,
	onClose,
	onSuccess,
	mode = "add",
	editItem = null,
}: Props) {
	const [categories, setCategories] = useState<Category[]>([]);

	const [loading, setLoading] = useState(false);

	const [uploading, setUploading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		preparationTime: "",
		category: "",
		image: "",
		isAvailable: true,
	});

	// ================= RESET FORM =================

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			price: "",
			preparationTime: "",
			category: "",
			image: "",
			isAvailable: true,
		});
	};

	// ================= PREFILL EDIT =================

	useEffect(() => {
		if (mode === "edit" && editItem) {
			setFormData({
				name: editItem.name || "",
				description: editItem.description || "",
				price: String(editItem.price || ""),
				preparationTime: String(editItem.preparationTime || ""),
				category: editItem.category?._id || "",
				image: editItem.image || "",
				isAvailable: editItem.isAvailable,
			});
		}

		if (mode === "add") {
			resetForm();
		}
	}, [mode, editItem]);

	// ================= FETCH CATEGORIES =================

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/categories");

				const data = await res.json();

				setCategories(
					Array.isArray(data.categories)
						? data.categories
						: Array.isArray(data)
							? data
							: [],
				);
			} catch (error) {
				console.error(error);

				toast.error("Failed to fetch categories");
			}
		};

		if (open) {
			fetchCategories();
		}
	}, [open]);

	// ================= IMAGE UPLOAD =================

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const file = e.target.files?.[0];

			if (!file) return;

			setUploading(true);

			const uploadData = new FormData();

			uploadData.append("file", file);

			uploadData.append("upload_preset", "biterush");

			const res = await fetch(
				"https://api.cloudinary.com/v1_1/drfsxvmss/image/upload",
				{
					method: "POST",
					body: uploadData,
				},
			);

			const data = await res.json();

			if (!data.secure_url) {
				toast.error("Image upload failed");

				return;
			}

			setFormData((prev) => ({
				...prev,
				image: data.secure_url,
			}));

			toast.success("Image uploaded successfully");
		} catch (error) {
			console.error(error);

			toast.error("Image upload failed");
		} finally {
			setUploading(false);
		}
	};

	// ================= SUBMIT =================

	const handleSubmit = async () => {
		try {
			if (
				!formData.name ||
				!formData.description ||
				!formData.price ||
				!formData.category ||
				!formData.image
			) {
				toast.error("Please fill all required fields");

				return;
			}

			setLoading(true);

			const token = localStorage.getItem("token");

			const payload = {
				...formData,
				price: Number(formData.price),
				preparationTime: Number(formData.preparationTime),
			};

			const endpoint =
				mode === "edit"
					? `http://localhost:5000/api/menu/${editItem?._id}`
					: "http://localhost:5000/api/menu";

			const method = mode === "edit" ? "PUT" : "POST";

			const res = await fetch(endpoint, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Something went wrong");

				return;
			}

			toast.success(
				mode === "edit"
					? "Menu item updated successfully"
					: "Menu item created successfully",
			);

			onSuccess();

			onClose();

			resetForm();
		} catch (error) {
			console.error(error);

			toast.error(
				mode === "edit" ? "Failed to update item" : "Failed to create item",
			);
		} finally {
			setLoading(false);
		}
	};

	if (!open) return null;

	return (
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
					max-w-2xl
					max-h-[90vh]
					overflow-y-auto
					rounded-[36px]
					border border-white/10
					bg-[#0B1220]
					p-8
				"
			>
				{/* HEADER */}

				<div className="flex items-center justify-between mb-8">
					<div>
						<p className="text-orange-400 text-sm font-medium mb-2">
							{mode === "edit" ? "Update food item" : "Create new food item"}
						</p>

						<h2 className="text-3xl font-black text-white">
							{mode === "edit" ? "Edit Menu Item" : "Add Menu Item"}
						</h2>
					</div>

					<button
						onClick={onClose}
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

				{/* FORM */}

				<div className="space-y-5">
					<input
						type="text"
						placeholder="Food name"
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								name: e.target.value,
							}))
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

					<textarea
						placeholder="Description"
						value={formData.description}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						className="
							w-full
							h-32
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							p-5
							text-white
							outline-none
							resize-none
						"
					/>

					<div className="grid md:grid-cols-2 gap-5">
						<input
							type="number"
							placeholder="Price"
							value={formData.price}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									price: e.target.value,
								}))
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

						<input
							type="number"
							placeholder="Preparation time (mins)"
							value={formData.preparationTime}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									preparationTime: e.target.value,
								}))
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
					</div>

					<select
						value={formData.category}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								category: e.target.value,
							}))
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
					>
						<option value="">Select category</option>

						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>

					{/* IMAGE */}

					<div
						className="
							rounded-3xl
							border border-dashed border-white/10
							bg-white/[0.02]
							p-8
							text-center
						"
					>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
							id="imageUpload"
						/>

						<label
							htmlFor="imageUpload"
							className="
								cursor-pointer
								flex flex-col items-center
							"
						>
							<div
								className="
									w-16 h-16
									rounded-2xl
									bg-orange-500/10
									border border-orange-500/20
									flex items-center justify-center
								"
							>
								<Upload className="w-7 h-7 text-orange-400" />
							</div>

							<p className="text-white font-medium mt-5">
								{uploading ? "Uploading..." : "Upload Food Image"}
							</p>

							<p className="text-sm text-gray-500 mt-2">
								PNG, JPG, WEBP supported
							</p>
						</label>

						{formData.image && (
							<div className="mt-5">
								<img
									src={formData.image}
									alt="Preview"
									className="
										w-32 h-32
										object-cover
										rounded-2xl
										mx-auto
										border border-white/10
									"
								/>

								<div
									className="
										mt-4
										inline-flex items-center gap-2
										text-emerald-400 text-sm
									"
								>
									<Check className="w-4 h-4" />
									Image uploaded successfully
								</div>
							</div>
						)}
					</div>

					{/* AVAILABILITY */}

					<button
						type="button"
						onClick={() =>
							setFormData((prev) => ({
								...prev,
								isAvailable: !prev.isAvailable,
							}))
						}
						className={`
							w-full
							h-14
							rounded-2xl
							border
							font-medium
							transition-all duration-300

							${
								formData.isAvailable
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
						{formData.isAvailable ? "Available" : "Unavailable"}
					</button>

					{/* SUBMIT */}

					<button
						onClick={handleSubmit}
						disabled={loading || uploading}
						className="
							w-full
							h-16
							rounded-3xl
							bg-orange-500
							hover:bg-orange-600
							disabled:opacity-50
							text-white
							font-semibold
							text-lg
							shadow-2xl shadow-orange-500/20
							transition-all duration-300
						"
					>
						{loading
							? mode === "edit"
								? "Updating..."
								: "Creating..."
							: mode === "edit"
								? "Update Menu Item"
								: "Create Menu Item"}
					</button>
				</div>
			</div>
		</div>
	);
}
