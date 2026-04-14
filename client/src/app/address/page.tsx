"use client";

import { useEffect, useState } from "react";

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

	// Fetch addresses
	const fetchAddresses = async () => {
		const res = await fetch("http://localhost:5000/api/addresses", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		setAddresses(data);
	};

	useEffect(() => {
		fetchAddresses();
	}, []);

	// Add address
	const handleAdd = async () => {
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
			alert(data.message);
			return;
		}

		setForm({
			fullName: "",
			phone: "",
			street: "",
			city: "",
			state: "",
			pincode: "",
		});

		fetchAddresses();
	};

	// Delete
	const handleDelete = async (id: string) => {
		await fetch(`http://localhost:5000/api/addresses/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		fetchAddresses();
	};

	return (
		<div className="min-h-screen p-4 bg-background dark:bg-gray-900">
			<h1 className="text-2xl font-heading mb-6 dark:text-white">
				Your Addresses
			</h1>

			{/* FORM */}
			<div className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-6">
				<div className="grid gap-3">
					{Object.keys(form).map((key) => (
						<input
							key={key}
							placeholder={key}
							value={(form as any)[key]}
							onChange={(e) => setForm({ ...form, [key]: e.target.value })}
							className="px-3 py-2 rounded border dark:bg-gray-700"
						/>
					))}
				</div>

				<button
					onClick={handleAdd}
					className="mt-4 bg-primary text-white px-4 py-2 rounded"
				>
					Add Address
				</button>
			</div>

			{/* LIST */}
			<div className="space-y-4">
				{addresses.map((addr) => (
					<div
						key={addr._id}
						className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
					>
						<p className="font-semibold dark:text-white">{addr.fullName}</p>
						<p className="text-sm text-gray-500">
							{addr.street}, {addr.city}
						</p>
						<p className="text-sm text-gray-500">
							{addr.state} - {addr.pincode}
						</p>

						<button
							onClick={() => handleDelete(addr._id)}
							className="text-red-500 mt-2 text-sm"
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
