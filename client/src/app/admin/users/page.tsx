"use client";

import { useEffect, useState } from "react";

import {
	Users,
	Search,
	Shield,
	UserCheck,
	UserX,
	Trash2,
	Crown,
	IndianRupee,
	RefreshCcw,
	X,
} from "lucide-react";

import { toast } from "sonner";

interface User {
	_id: string;

	name: string;

	email: string;

	role: "user" | "admin";

	isBlocked?: boolean;

	totalOrders?: number;

	totalSpent?: number;

	createdAt: string;
}

export default function AdminUsersPage() {
	const [users, setUsers] = useState<User[]>([]);

	const [loading, setLoading] = useState(true);

	const [refreshing, setRefreshing] = useState(false);

	const [search, setSearch] = useState("");

	const [roleFilter, setRoleFilter] = useState("all");

	const [confirmModal, setConfirmModal] = useState<{
		open: boolean;

		title: string;

		description: string;

		action: () => void;
	}>({
		open: false,
		title: "",
		description: "",
		action: () => {},
	});

	// ================= FETCH USERS =================

	const fetchUsers = async (showRefresh = false) => {
		try {
			if (showRefresh) {
				setRefreshing(true);
			}

			const token = localStorage.getItem("token");

			const query = new URLSearchParams({
				search,
				role: roleFilter,
			});

			const res = await fetch(
				`http://localhost:5000/api/users?${query.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await res.json();

			setUsers(Array.isArray(data.users) ? data.users : []);
		} catch (error) {
			console.error(error);

			toast.error("Failed to load users");
		} finally {
			setLoading(false);

			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [search, roleFilter]);

	// ================= BLOCK USER =================

	const toggleBlockUser = async (id: string) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(`http://localhost:5000/api/users/${id}/block`, {
				method: "PUT",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);

				return;
			}

			toast.success(data.message);

			setUsers((prev) =>
				prev.map((user) =>
					user._id === id
						? {
								...user,
								isBlocked: !user.isBlocked,
							}
						: user,
				),
			);

			setConfirmModal((prev) => ({
				...prev,
				open: false,
			}));
		} catch (error) {
			console.error(error);

			toast.error("Failed to update user");
		}
	};

	// ================= CHANGE ROLE =================

	const changeRole = async (id: string, role: "user" | "admin") => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(`http://localhost:5000/api/users/${id}/role`, {
				method: "PUT",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					role,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);

				return;
			}

			toast.success(data.message);

			setUsers((prev) =>
				prev.map((user) =>
					user._id === id
						? {
								...user,
								role,
							}
						: user,
				),
			);

			setConfirmModal((prev) => ({
				...prev,
				open: false,
			}));
		} catch (error) {
			console.error(error);

			toast.error("Failed to update role");
		}
	};

	// ================= DELETE USER =================

	const deleteUser = async (id: string) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(`http://localhost:5000/api/users/${id}`, {
				method: "DELETE",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);

				return;
			}

			toast.success("User deleted");

			setUsers((prev) => prev.filter((user) => user._id !== id));

			setConfirmModal((prev) => ({
				...prev,
				open: false,
			}));
		} catch (error) {
			console.error(error);

			toast.error("Failed to delete user");
		}
	};

	// ================= LOADING =================

	if (loading) {
		return (
			<div className="min-h-screen p-6">
				<div className="space-y-5">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="
								h-[180px]
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
		<div className="min-h-screen text-white overflow-hidden">
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
							User Management
						</div>

						<h1
							className="
								text-4xl
								md:text-5xl
								font-black
								tracking-tight
							"
						>
							Admin
							<span className="text-orange-500"> Users</span>
						</h1>

						<p className="text-gray-400 mt-4 text-lg">
							Manage platform users and permissions.
						</p>
					</div>

					<button
						onClick={() => fetchUsers(true)}
						className="
							h-12
							px-5
							rounded-2xl
							bg-orange-500
							hover:bg-orange-600
							text-white
							font-semibold
							flex items-center gap-2
							transition-all
						"
					>
						<RefreshCcw
							className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
						/>
						Refresh
					</button>
				</div>

				{/* FILTERS */}

				<div className="grid md:grid-cols-[1fr_220px] gap-4 mb-8">
					<div className="relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

						<input
							type="text"
							placeholder="Search users..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="
								w-full
								h-14
								rounded-2xl
								bg-white/[0.03]
								border border-white/10
								pl-12
								pr-4
								text-white
								placeholder:text-gray-500
								outline-none
							"
						/>
					</div>

					<select
						value={roleFilter}
						onChange={(e) => setRoleFilter(e.target.value)}
						className="
							h-14
							rounded-2xl
							bg-white/[0.03]
							border border-white/10
							px-4
							text-white
							outline-none
						"
					>
						<option value="all">All Roles</option>

						<option value="user">Users</option>

						<option value="admin">Admins</option>
					</select>
				</div>

				{/* USERS */}

				<div className="space-y-5">
					{users.map((user) => (
						<div
							key={user._id}
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
									xl:flex-row
									xl:items-center
									xl:justify-between
									gap-6
								"
							>
								{/* LEFT */}

								<div className="flex-1">
									<div className="flex items-center gap-4 flex-wrap mb-5">
										<div
											className="
												w-14 h-14
												rounded-2xl
												bg-orange-500
												text-white
												font-black
												text-xl
												flex items-center justify-center
											"
										>
											{user.name.charAt(0).toUpperCase()}
										</div>

										<div>
											<h2 className="text-2xl font-black">{user.name}</h2>

											<p className="text-gray-400 mt-1">{user.email}</p>
										</div>

										<div
											className={`
												px-4 py-2
												rounded-full
												text-sm
												font-semibold
												border
												${
													user.role === "admin"
														? "bg-purple-500/15 text-purple-400 border-purple-500/20"
														: "bg-sky-500/15 text-sky-400 border-sky-500/20"
												}
											`}
										>
											{user.role}
										</div>

										{user.isBlocked && (
											<div
												className="
													px-4 py-2
													rounded-full
													text-sm
													font-semibold
													border
													bg-red-500/15
													text-red-400
													border-red-500/20
												"
											>
												Blocked
											</div>
										)}
									</div>

									<div className="grid md:grid-cols-3 gap-5">
										<div
											className="
												rounded-2xl
												bg-white/[0.03]
												border border-white/10
												p-4
											"
										>
											<p className="text-gray-500 text-sm mb-2">Total Orders</p>

											<div className="flex items-center gap-2">
												<Users className="w-5 h-5 text-orange-400" />

												<h3 className="text-2xl font-black">
													{user.totalOrders || 0}
												</h3>
											</div>
										</div>

										<div
											className="
												rounded-2xl
												bg-white/[0.03]
												border border-white/10
												p-4
											"
										>
											<p className="text-gray-500 text-sm mb-2">Total Spent</p>

											<div className="flex items-center gap-2">
												<IndianRupee className="w-5 h-5 text-green-400" />

												<h3 className="text-2xl font-black">
													₹{user.totalSpent || 0}
												</h3>
											</div>
										</div>

										<div
											className="
												rounded-2xl
												bg-white/[0.03]
												border border-white/10
												p-4
											"
										>
											<p className="text-gray-500 text-sm mb-2">Joined</p>

											<h3 className="font-semibold text-lg">
												{new Date(user.createdAt).toLocaleDateString()}
											</h3>
										</div>
									</div>
								</div>

								{/* ACTIONS */}

								<div className="w-full xl:w-[260px] space-y-3">
									<button
										onClick={() =>
											setConfirmModal({
												open: true,
												title: user.isBlocked ? "Unblock User" : "Block User",
												description: user.isBlocked
													? "Allow this user to access BiteRush again?"
													: "This user will no longer access BiteRush.",
												action: () => toggleBlockUser(user._id),
											})
										}
										className={`
											w-full
											h-12
											rounded-2xl
											font-semibold
											flex items-center justify-center gap-2
											transition-all
											${
												user.isBlocked
													? "bg-green-500/10 border border-green-500/20 text-green-400"
													: "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
											}
										`}
									>
										{user.isBlocked ? (
											<UserCheck className="w-4 h-4" />
										) : (
											<UserX className="w-4 h-4" />
										)}

										{user.isBlocked ? "Unblock User" : "Block User"}
									</button>

									<button
										onClick={() =>
											setConfirmModal({
												open: true,
												title:
													user.role === "admin" ? "Remove Admin" : "Make Admin",
												description:
													user.role === "admin"
														? "This user will lose admin access."
														: "This user will get full admin access.",
												action: () =>
													changeRole(
														user._id,
														user.role === "admin" ? "user" : "admin",
													),
											})
										}
										className="
											w-full
											h-12
											rounded-2xl
											bg-purple-500/10
											border border-purple-500/20
											text-purple-400
											font-semibold
											flex items-center justify-center gap-2
										"
									>
										<Crown className="w-4 h-4" />

										{user.role === "admin" ? "Remove Admin" : "Make Admin"}
									</button>

									<button
										onClick={() =>
											setConfirmModal({
												open: true,
												title: "Delete User",
												description: "This action cannot be undone.",
												action: () => deleteUser(user._id),
											})
										}
										className="
											w-full
											h-12
											rounded-2xl
											bg-red-500/10
											border border-red-500/20
											text-red-400
											font-semibold
											flex items-center justify-center gap-2
										"
									>
										<Trash2 className="w-4 h-4" />
										Delete User
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CONFIRM MODAL */}

			{confirmModal.open && (
				<div
					className="
						fixed
						inset-0
						z-[100]
						bg-black/70
						backdrop-blur-sm
						flex
						items-center
						justify-center
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
							p-7
						"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-2xl font-black">{confirmModal.title}</h2>

								<p className="text-gray-400 mt-3 leading-relaxed">
									{confirmModal.description}
								</p>
							</div>

							<button
								onClick={() =>
									setConfirmModal((prev) => ({
										...prev,
										open: false,
									}))
								}
								className="
									w-10 h-10
									rounded-xl
									bg-white/[0.03]
									border border-white/10
									flex items-center justify-center
									text-gray-400
								"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<div className="grid grid-cols-2 gap-3 mt-8">
							<button
								onClick={() =>
									setConfirmModal((prev) => ({
										...prev,
										open: false,
									}))
								}
								className="
									h-12
									rounded-2xl
									bg-white/[0.03]
									border border-white/10
									text-white
									font-semibold
								"
							>
								Cancel
							</button>

							<button
								onClick={confirmModal.action}
								className="
									h-12
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									text-white
									font-semibold
								"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
