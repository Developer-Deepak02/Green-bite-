"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
	MapPin,
	Plus,
	Trash2,
	Home,
	Phone,
	User,
	MapPinned,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/shared/Navbar";

interface Address {
	_id: string;
	fullName: string;
	phone: string;
	street: string;
	city: string;
	state: string;
	pincode: string;
}

export default function AddressPage() {
	const [addresses, setAddresses] = useState<Address[]>([]);

	const [loading, setLoading] = useState(true);

	const [adding, setAdding] = useState(false);

	const [form, setForm] = useState({
		fullName: "",
		phone: "",
		street: "",
		city: "",
		state: "",
		pincode: "",
	});

	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	/* FETCH ADDRESSES */

	const fetchAddresses = async () => {
		try {
			const res = await fetch("http://localhost:5000/api/addresses", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (Array.isArray(data)) {
				setAddresses(data);
			} else if (Array.isArray(data.addresses)) {
				setAddresses(data.addresses);
			} else {
				setAddresses([]);
			}
		} catch (error) {
			console.error(error);
			setAddresses([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAddresses();
	}, []);

	/* ADD ADDRESS */

	const handleAdd = async () => {
		try {
			if (
				!form.fullName ||
				!form.phone ||
				!form.street ||
				!form.city ||
				!form.state ||
				!form.pincode
			) {
				toast.error("Please fill all address fields");

				return;
			}

			setAdding(true);

			const res = await fetch("http://localhost:5000/api/addresses", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to add address");

				return;
			}

			toast.success("Address added successfully");

			setForm({
				fullName: "",
				phone: "",
				street: "",
				city: "",
				state: "",
				pincode: "",
			});

			fetchAddresses();
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setAdding(false);
		}
	};

	/* DELETE ADDRESS */

const handleDelete = async (id: string) => {
	try {
		const res = await fetch(`http://localhost:5000/api/addresses/${id}`, {
			method: "DELETE",

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			toast.error("Failed to delete address");

			return;
		}

		toast.success("Address deleted successfully");

		fetchAddresses();
	} catch (error) {
		console.error(error);

		toast.error("Something went wrong");
	}
};

	return (
		<ProtectedRoute>
			<section className="relative min-h-screen bg-[#020817] overflow-hidden">
				<Navbar />
				{/* BG GLOW */}

				<div
					className="
					absolute
					top-0
					left-1/2
					-translate-x-1/2
					w-[850px]
					h-[500px]
					bg-orange-500/10
					blur-[180px]
					rounded-full
					pointer-events-none
				"
				/>

				<div className="relative z-10 px-4 md:px-6 py-8">
					{/* HEADER */}

					<div className="max-w-7xl mx-auto mb-8">
						<div className="space-y-3">
							<div
								className="
								inline-flex
								items-center
								gap-2
								bg-orange-500/10
								border border-orange-500/20
								text-orange-400
								px-4 py-2
								rounded-full
								text-sm
								font-medium
							"
							>
								<MapPin className="w-4 h-4" />
								Saved Addresses
							</div>

							<h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
								Manage Your
								<span className="text-orange-500"> Addresses</span>
							</h1>

							<p className="text-gray-400 max-w-2xl">
								Add and manage delivery locations for faster checkout.
							</p>
						</div>
					</div>

					{/* CONTENT */}

					<div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
						{/* FORM */}

						<div
							className="
							bg-white/[0.03]
							border border-white/10
							backdrop-blur-2xl
							rounded-[28px]
							p-5
							h-fit
							xl:sticky
							xl:top-24
						"
						>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-white">
									Add New Address
								</h2>

								<p className="text-sm text-gray-400 mt-1">
									Enter delivery details below
								</p>
							</div>

							<div className="space-y-4">
								{/* FULL NAME */}

								<div className="relative">
									<User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

									<input
										type="text"
										placeholder="Full Name"
										value={form.fullName}
										onChange={(e) =>
											setForm({
												...form,
												fullName: e.target.value,
											})
										}
										className="
										w-full
										h-12
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-11
										pr-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
									"
									/>
								</div>

								{/* PHONE */}

								<div className="relative">
									<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

									<input
										type="text"
										placeholder="Phone Number"
										value={form.phone}
										onChange={(e) =>
											setForm({
												...form,
												phone: e.target.value,
											})
										}
										className="
										w-full
										h-12
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-11
										pr-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
									"
									/>
								</div>

								{/* STREET */}

								<div className="relative">
									<Home className="absolute left-4 top-4 w-4 h-4 text-gray-500" />

									<textarea
										placeholder="Street Address"
										value={form.street}
										onChange={(e) =>
											setForm({
												...form,
												street: e.target.value,
											})
										}
										className="
										w-full
										min-h-[100px]
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-11
										pr-4
										py-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
										resize-none
									"
									/>
								</div>

								{/* CITY + STATE */}

								<div className="grid grid-cols-2 gap-4">
									<input
										type="text"
										placeholder="City"
										value={form.city}
										onChange={(e) =>
											setForm({
												...form,
												city: e.target.value,
											})
										}
										className="
										w-full
										h-12
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										px-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
									"
									/>

									<input
										type="text"
										placeholder="State"
										value={form.state}
										onChange={(e) =>
											setForm({
												...form,
												state: e.target.value,
											})
										}
										className="
										w-full
										h-12
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										px-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
									"
									/>
								</div>

								{/* PINCODE */}

								<div className="relative">
									<MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

									<input
										type="text"
										placeholder="Pincode"
										value={form.pincode}
										onChange={(e) =>
											setForm({
												...form,
												pincode: e.target.value,
											})
										}
										className="
										w-full
										h-12
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-11
										pr-4
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
									"
									/>
								</div>

								{/* BUTTON */}

								<button
									onClick={handleAdd}
									disabled={adding}
									className="
									w-full
									h-13
									rounded-2xl
									bg-orange-500
									hover:bg-orange-600
									disabled:opacity-50
									text-white
									font-semibold
									transition-all duration-300
									shadow-xl shadow-orange-500/20
									flex items-center justify-center gap-2
								"
								>
									{adding ? "Adding Address..." : "Add Address"}

									<Plus className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* ADDRESS LIST */}

						<div
							className="
							bg-white/[0.03]
							border border-white/10
							backdrop-blur-2xl
							rounded-[28px]
							p-5
						"
						>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-white">
									Your Addresses
								</h2>

								<p className="text-sm text-gray-400 mt-1">
									Manage your saved delivery locations
								</p>
							</div>

							{/* LOADING */}

							{loading ? (
								<div className="space-y-4">
									{[1, 2, 3].map((item) => (
										<div
											key={item}
											className="
											h-32
											rounded-3xl
											bg-white/[0.03]
											border border-white/10
											animate-pulse
										"
										/>
									))}
								</div>
							) : addresses.length === 0 ? (
								<div
									className="
									border border-dashed border-white/10
									rounded-3xl
									p-10
									text-center
								"
								>
									<div
										className="
										w-16
										h-16
										mx-auto
										rounded-2xl
										bg-orange-500/10
										border border-orange-500/20
										flex items-center justify-center
										mb-5
									"
									>
										<MapPin className="w-7 h-7 text-orange-400" />
									</div>

									<h3 className="text-2xl font-bold text-white mb-3">
										No Addresses Yet
									</h3>

									<p className="text-gray-400 max-w-md mx-auto">
										Add your first address to simplify checkout and delivery.
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{addresses.map((addr) => (
										<div
											key={addr._id}
											className="
											relative
											rounded-3xl
											border border-white/10
											bg-white/[0.03]
											p-5
											transition-all duration-300
											hover:border-white/20
										"
										>
											{/* DELETE */}

											<button
												onClick={() => handleDelete(addr._id)}
												className="
												absolute
												top-4
												right-4
												w-10
												h-10
												rounded-xl
												bg-red-500/10
												border border-red-500/20
												text-red-400
												flex items-center justify-center
												hover:bg-red-500/20
												transition-all
											"
											>
												<Trash2 className="w-4 h-4" />
											</button>

											<div className="space-y-4">
												<div>
													<h3 className="text-xl font-bold text-white">
														{addr.fullName}
													</h3>

													<p className="text-sm text-gray-500 mt-1">
														{addr.phone}
													</p>
												</div>

												<div className="space-y-2 text-gray-400 leading-relaxed">
													<p>{addr.street}</p>

													<p>
														{addr.city}, {addr.state}
													</p>

													<p>{addr.pincode}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</ProtectedRoute>
	);
}
