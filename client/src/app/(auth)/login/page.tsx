"use client";

// WHY: Handles user authentication from frontend

import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		try {
			setLoading(true);

			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message);
				return;
			}

			// Store token (temporary — we’ll improve later)
			localStorage.setItem("token", data.token);

			alert("Login successful!");
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900 px-4">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
				<h2 className="text-2xl font-heading mb-6 text-center dark:text-white">
					Login
				</h2>

				{/* Email */}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full mb-4 px-4 py-2 rounded-lg border 
          bg-white dark:bg-gray-700 
          border-gray-300 dark:border-gray-600"
				/>

				{/* Password */}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full mb-4 px-4 py-2 rounded-lg border 
          bg-white dark:bg-gray-700 
          border-gray-300 dark:border-gray-600"
				/>

				{/* Button */}
				<button
					onClick={handleLogin}
					disabled={loading}
					className="w-full bg-primary hover:bg-primary-dark 
          text-white py-2 rounded-lg transition"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</div>
		</div>
	);
}
