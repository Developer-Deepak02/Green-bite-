"use client";

import { useEffect, useMemo, useState } from "react";

import {
	BadgePercent,
	CalendarDays,
	Copy,
	Plus,
	RefreshCcw,
	Search,
	Trash2,
	Pencil,
	CheckCircle2,
	XCircle,
	Power,
	PowerOff,
	AlertTriangle,
} from "lucide-react";

import { toast } from "sonner";

interface Coupon {
	_id: string;

	code: string;

	discountType: "percentage" | "fixed";

	discountValue: number;

	minimumOrderAmount: number;

	expiryDate: string;

	usageLimit: number;

	usedCount: number;

	isActive: boolean;

	createdAt: string;
}

export default function AdminCouponsPage() {
	const [coupons, setCoupons] = useState<Coupon[]>([]);

	const [loading, setLoading] = useState(true);

	const [refreshing, setRefreshing] = useState(false);

	const [search, setSearch] = useState("");

	const [showCreate, setShowCreate] = useState(false);

	const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

	const [submitting, setSubmitting] = useState(false);

	const [confirmModal, setConfirmModal] = useState<{
		open: boolean;

		type: "delete" | "toggle";

		coupon: Coupon | null;
	}>({
		open: false,

		type: "toggle",

		coupon: null,
	});

	const [form, setForm] = useState({
		code: "",
		discountType: "percentage",
		discountValue: "",
		minimumOrderAmount: "",
		expiryDate: "",
		usageLimit: "",
	});

	// ================= FETCH =================

	const fetchCoupons = async (showRefresh = false) => {
		try {
			if (showRefresh) {
				setRefreshing(true);
			}

			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/coupons", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to load coupons");

				return;
			}

			setCoupons(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setLoading(false);

			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchCoupons();
	}, []);

	// ================= CREATE =================

	const createCoupon = async () => {
		try {
			setSubmitting(true);

			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:5000/api/coupons", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					code: form.code,
					discountType: form.discountType,
					discountValue: Number(form.discountValue),
					minimumOrderAmount: Number(form.minimumOrderAmount),
					expiryDate: form.expiryDate,
					usageLimit: Number(form.usageLimit),
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to create coupon");

				return;
			}

			toast.success("Coupon created successfully");

			setShowCreate(false);

			resetForm();

			fetchCoupons();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setSubmitting(false);
		}
	};

	// ================= UPDATE =================

	const updateCoupon = async () => {
		if (!editingCoupon) return;

		try {
			setSubmitting(true);

			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/coupons/${editingCoupon._id}`,
				{
					method: "PUT",

					headers: {
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					},

					body: JSON.stringify({
						code: form.code,
						discountType: form.discountType,
						discountValue: Number(form.discountValue),
						minimumOrderAmount: Number(form.minimumOrderAmount),
						expiryDate: form.expiryDate,
						usageLimit: Number(form.usageLimit),
					}),
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to update coupon");

				return;
			}

			toast.success("Coupon updated successfully");

			setEditingCoupon(null);

			resetForm();

			fetchCoupons();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setSubmitting(false);
		}
	};

	// ================= TOGGLE ACTIVE =================

	const toggleCouponStatus = async (coupon: Coupon) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/coupons/${coupon._id}`,
				{
					method: "PUT",

					headers: {
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					},

					body: JSON.stringify({
						isActive: !coupon.isActive,
					}),
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to update coupon");

				return;
			}

			toast.success(
				coupon.isActive
					? "Coupon disabled successfully"
					: "Coupon enabled successfully",
			);

			setConfirmModal({
				open: false,

				type: "toggle",

				coupon: null,
			});

			fetchCoupons();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		}
	};

	// ================= DELETE =================

	const deleteCoupon = async (coupon: Coupon) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:5000/api/coupons/${coupon._id}/permanent`,
				{
					method: "DELETE",

					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to delete coupon");

				return;
			}

			toast.success("Coupon deleted permanently");

			setConfirmModal({
				open: false,

				type: "delete",

				coupon: null,
			});

			fetchCoupons();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		}
	};

	// ================= HELPERS =================

	const resetForm = () => {
		setForm({
			code: "",
			discountType: "percentage",
			discountValue: "",
			minimumOrderAmount: "",
			expiryDate: "",
			usageLimit: "",
		});
	};

	const openEdit = (coupon: Coupon) => {
		setEditingCoupon(coupon);

		setForm({
			code: coupon.code,
			discountType: coupon.discountType,
			discountValue: String(coupon.discountValue),
			minimumOrderAmount: String(coupon.minimumOrderAmount),
			expiryDate: coupon.expiryDate.split("T")[0],
			usageLimit: String(coupon.usageLimit),
		});
	};

	const copyCoupon = async (code: string) => {
		try {
			await navigator.clipboard.writeText(code);

			toast.success("Coupon copied");
		} catch (error) {
			console.error(error);

			toast.error("Failed to copy coupon");
		}
	};

	const filteredCoupons = useMemo(() => {
		return coupons.filter((coupon) => {
			const searchTerm = search.toLowerCase();

			return (
				coupon.code.toLowerCase().includes(searchTerm) ||
				coupon.discountType.toLowerCase().includes(searchTerm)
			);
		});
	}, [coupons, search]);

	const totalCoupons = coupons.length;

	const activeCoupons = coupons.filter((c) => c.isActive).length;

	const expiredCoupons = coupons.filter(
		(c) => new Date(c.expiryDate) < new Date(),
	).length;

	const totalUsage = coupons.reduce((acc, c) => acc + c.usedCount, 0);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817] p-6">
				<div className="space-y-5">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="
								h-[220px]
								rounded-[32px]
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
		<div className="min-h-screen bg-[#020817] text-white overflow-hidden">
			{/* BACKGROUND */}

			<div
				className="
					absolute
					top-0
					left-1/2
					-translate-x-1/2
					w-[900px]
					h-[500px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
			/>

			<div className="relative z-10 p-4 md:p-8">
				{/* HEADER */}

				<div
					className="
						flex
						flex-col
						lg:flex-row
						lg:items-center
						lg:justify-between
						gap-6
						mb-10
					"
				>
					<div>
						<div
							className="
								inline-flex
								items-center
								px-4 py-2
								rounded-full
								bg-orange-500/10
								border border-orange-500/20
								text-orange-400
								text-sm
								font-medium
								mb-5
							"
						>
							Coupon Management
						</div>

						<h1 className="text-4xl md:text-5xl font-black tracking-tight">
							Admin
							<span className="text-orange-500"> Coupons</span>
						</h1>

						<p className="text-gray-400 mt-4 text-lg">
							Create and manage discount coupons.
						</p>
					</div>

					<div className="flex items-center gap-3 flex-wrap">
						<button
							onClick={() => fetchCoupons(true)}
							className="
								h-12
								px-5
								rounded-2xl
								bg-white/[0.05]
								border border-white/10
								flex items-center gap-2
							"
						>
							<RefreshCcw
								className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
							/>
							Refresh
						</button>

						<button
							onClick={() => {
								resetForm();

								setShowCreate(true);
							}}
							className="
								h-12
								px-5
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								font-semibold
								flex items-center gap-2
							"
						>
							<Plus className="w-4 h-4" />
							Create Coupon
						</button>
					</div>
				</div>

				{/* STATS */}

				<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
					{[
						{
							label: "Total Coupons",
							value: totalCoupons,
							icon: BadgePercent,
						},
						{
							label: "Active",
							value: activeCoupons,
							icon: CheckCircle2,
						},
						{
							label: "Expired",
							value: expiredCoupons,
							icon: XCircle,
						},
						{
							label: "Total Usage",
							value: totalUsage,
							icon: Copy,
						},
					].map((item) => {
						const Icon = item.icon;

						return (
							<div
								key={item.label}
								className="
									rounded-[28px]
									border border-white/10
									bg-white/[0.03]
									p-6
								"
							>
								<div className="flex items-center justify-between">
									<p className="text-gray-500 text-sm">{item.label}</p>

									<Icon className="w-5 h-5 text-orange-400" />
								</div>

								<h3 className="text-4xl font-black mt-4">{item.value}</h3>
							</div>
						);
					})}
				</div>

				{/* SEARCH */}

				<div className="relative mb-8">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

					<input
						type="text"
						placeholder="Search coupons..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="
							w-full
							h-14
							pl-12
							pr-4
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							text-white
							outline-none
						"
					/>
				</div>

				{/* LIST */}

				<div className="space-y-5">
					{filteredCoupons.map((coupon) => {
						const expired = new Date(coupon.expiryDate).getTime() < Date.now();

						return (
							<div
								key={coupon._id}
								className="
									rounded-[32px]
									border border-white/10
									bg-white/[0.03]
									backdrop-blur-2xl
									p-6
								"
							>
								<div
									className="
										flex
										flex-col
										lg:flex-row
										lg:items-center
										lg:justify-between
										gap-6
									"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 flex-wrap">
											<div
												className="
													px-4 py-2
													rounded-2xl
													bg-orange-500/10
													border border-orange-500/20
													text-orange-400
													font-black
													text-lg
													flex items-center gap-2
												"
											>
												<BadgePercent className="w-5 h-5" />

												{coupon.code}
											</div>

											<div
												className={`
													px-3 py-1
													rounded-full
													text-xs
													font-semibold
													border
													${
														coupon.isActive
															? "bg-green-500/15 text-green-400 border-green-500/20"
															: "bg-red-500/15 text-red-400 border-red-500/20"
													}
												`}
											>
												{coupon.isActive ? "ACTIVE" : "DISABLED"}
											</div>

											{expired && (
												<div
													className="
														px-3 py-1
														rounded-full
														text-xs
														font-semibold
														border
														bg-red-500/15
														text-red-400
														border-red-500/20
													"
												>
													EXPIRED
												</div>
											)}
										</div>

										<div className="grid md:grid-cols-4 gap-5 mt-6">
											<div>
												<p className="text-gray-500 text-sm mb-2">Discount</p>

												<h3 className="font-bold text-xl">
													{coupon.discountType === "percentage"
														? `${coupon.discountValue}%`
														: `₹${coupon.discountValue}`}
												</h3>
											</div>

											<div>
												<p className="text-gray-500 text-sm mb-2">
													Minimum Order
												</p>

												<h3 className="font-bold text-xl">
													₹{coupon.minimumOrderAmount}
												</h3>
											</div>

											<div>
												<p className="text-gray-500 text-sm mb-2">Usage</p>

												<h3 className="font-bold text-xl">
													{coupon.usedCount} / {coupon.usageLimit || "∞"}
												</h3>
											</div>

											<div>
												<p className="text-gray-500 text-sm mb-2">Expiry</p>

												<div className="flex items-center gap-2">
													<CalendarDays className="w-4 h-4 text-orange-400" />

													<p className="font-semibold">
														{new Date(coupon.expiryDate).toLocaleDateString()}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* ACTIONS */}

									<div className="flex items-center gap-3 flex-wrap">
										{/* COPY */}

										<button
											onClick={() => copyCoupon(coupon.code)}
											className="
												w-12 h-12
												rounded-2xl
												bg-white/[0.05]
												border border-white/10
												flex items-center justify-center
												hover:bg-white/[0.08]
												transition-all
											"
										>
											<Copy className="w-4 h-4" />
										</button>

										{/* EDIT */}

										<button
											onClick={() => openEdit(coupon)}
											className="
												w-12 h-12
												rounded-2xl
												bg-blue-500/15
												border border-blue-500/20
												text-blue-400
												flex items-center justify-center
												hover:bg-blue-500/20
												transition-all
											"
										>
											<Pencil className="w-4 h-4" />
										</button>

										{/* ENABLE / DISABLE */}

										<button
											onClick={() =>
												setConfirmModal({
													open: true,

													type: "toggle",

													coupon,
												})
											}
											className={`
												h-12
												px-4
												rounded-2xl
												border
												font-semibold
												flex items-center gap-2
												transition-all
												${
													coupon.isActive
														? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20"
														: "bg-green-500/15 text-green-400 border-green-500/20 hover:bg-green-500/20"
												}
											`}
										>
											{coupon.isActive ? (
												<>
													<PowerOff className="w-4 h-4" />
													Disable
												</>
											) : (
												<>
													<Power className="w-4 h-4" />
													Enable
												</>
											)}
										</button>

										{/* DELETE */}

										<button
											onClick={() =>
												setConfirmModal({
													open: true,

													type: "delete",

													coupon,
												})
											}
											className="
												w-12 h-12
												rounded-2xl
												bg-red-500/15
												border border-red-500/20
												text-red-400
												flex items-center justify-center
												hover:bg-red-500/20
												transition-all
											"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* CREATE / EDIT MODAL */}

				{(showCreate || editingCoupon) && (
					<div
						className="
							fixed inset-0
							bg-black/70
							backdrop-blur-sm
							z-50
							flex items-center justify-center
							p-4
						"
					>
						<div
							className="
								w-full
								max-w-2xl
								rounded-[36px]
								bg-[#0B1220]
								border border-white/10
								p-7
							"
						>
							<h2 className="text-3xl font-black mb-8">
								{editingCoupon ? "Edit Coupon" : "Create Coupon"}
							</h2>

							<div className="grid md:grid-cols-2 gap-5">
								<input
									type="text"
									placeholder="Coupon Code"
									value={form.code}
									onChange={(e) =>
										setForm({
											...form,
											code: e.target.value.toUpperCase(),
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								/>

								<select
									value={form.discountType}
									onChange={(e) =>
										setForm({
											...form,
											discountType: e.target.value,
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								>
									<option value="percentage">Percentage</option>

									<option value="fixed">Fixed</option>
								</select>

								<input
									type="number"
									placeholder="Discount Value"
									value={form.discountValue}
									onChange={(e) =>
										setForm({
											...form,
											discountValue: e.target.value,
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								/>

								<input
									type="number"
									placeholder="Minimum Order Amount"
									value={form.minimumOrderAmount}
									onChange={(e) =>
										setForm({
											...form,
											minimumOrderAmount: e.target.value,
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								/>

								<input
									type="number"
									placeholder="Usage Limit"
									value={form.usageLimit}
									onChange={(e) =>
										setForm({
											...form,
											usageLimit: e.target.value,
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								/>

								<input
									type="date"
									value={form.expiryDate}
									onChange={(e) =>
										setForm({
											...form,
											expiryDate: e.target.value,
										})
									}
									className="
										h-14
										px-4
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										text-white
										outline-none
									"
								/>
							</div>

							<div className="flex items-center justify-end gap-4 mt-8">
								<button
									onClick={() => {
										setShowCreate(false);

										setEditingCoupon(null);

										resetForm();
									}}
									className="
										h-12
										px-5
										rounded-2xl
										bg-white/[0.05]
										border border-white/10
									"
								>
									Cancel
								</button>

								<button
									disabled={submitting}
									onClick={editingCoupon ? updateCoupon : createCoupon}
									className="
										h-12
										px-6
										rounded-2xl
										bg-orange-500
										hover:bg-orange-600
										font-semibold
										disabled:opacity-50
									"
								>
									{submitting
										? editingCoupon
											? "Updating..."
											: "Creating..."
										: editingCoupon
											? "Update Coupon"
											: "Create Coupon"}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* CONFIRM MODAL */}

				{confirmModal.open && confirmModal.coupon && (
					<div
						className="
							fixed inset-0
							bg-black/70
							backdrop-blur-sm
							z-50
							flex items-center justify-center
							p-4
						"
					>
						<div
							className="
								w-full
								max-w-md
								rounded-[36px]
								bg-[#0B1220]
								border border-white/10
								p-7
							"
						>
							<div
								className="
									w-16 h-16
									rounded-3xl
									bg-red-500/15
									border border-red-500/20
									flex items-center justify-center
									mb-6
								"
							>
								<AlertTriangle className="w-8 h-8 text-red-400" />
							</div>

							<h2 className="text-3xl font-black mb-3">
								{confirmModal.type === "delete"
									? "Delete Coupon?"
									: confirmModal.coupon.isActive
										? "Disable Coupon?"
										: "Enable Coupon?"}
							</h2>

							<p className="text-gray-400 leading-relaxed">
								{confirmModal.type === "delete"
									? `This will permanently delete ${confirmModal.coupon.code}. This action cannot be undone.`
									: confirmModal.coupon.isActive
										? `This will disable ${confirmModal.coupon.code} and users won't be able to use it.`
										: `This will enable ${confirmModal.coupon.code} again for customer usage.`}
							</p>

							<div className="flex items-center justify-end gap-4 mt-8">
								<button
									onClick={() =>
										setConfirmModal({
											open: false,

											type: "toggle",

											coupon: null,
										})
									}
									className="
										h-12
										px-5
										rounded-2xl
										bg-white/[0.05]
										border border-white/10
									"
								>
									Cancel
								</button>

								<button
									onClick={() => {
										if (confirmModal.type === "delete") {
											deleteCoupon(confirmModal.coupon!);
										} else {
											toggleCouponStatus(confirmModal.coupon!);
										}
									}}
									className={`
										h-12
										px-6
										rounded-2xl
										font-semibold
										transition-all
										${
											confirmModal.type === "delete"
												? "bg-red-500 hover:bg-red-600"
												: confirmModal.coupon.isActive
													? "bg-yellow-500 hover:bg-yellow-600 text-black"
													: "bg-green-500 hover:bg-green-600"
										}
									`}
								>
									{confirmModal.type === "delete"
										? "Delete"
										: confirmModal.coupon.isActive
											? "Disable"
											: "Enable"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
