"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import {
	ArrowRight,
	Eye,
	EyeOff,
	Lock,
	Mail,
	ShieldCheck,
	User,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
	const router = useRouter();

	const { setAuth } = useAuthStore();

	const [showPassword, setShowPassword] = useState(false);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	/* REGISTER */

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		/* VALIDATION */

		if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		if (form.password.length < 6) {
			alert("Password must be at least 6 characters");
			return;
		}

		try {
			setLoading(true);

			const res = await fetch("http://localhost:5000/api/auth/register", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					name: form.name,
					email: form.email,
					password: form.password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || "Registration failed");
				return;
			}

			/* SAVE AUTH */

			setAuth(data.user, data.token);

			/* REDIRECT */

			router.push("/");
		} catch (error) {
			console.error(error);

			alert("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="relative min-h-screen bg-[#020817] overflow-hidden flex items-center justify-center px-4 py-10">
			{/* BACKGROUND */}

			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

			{/* CARD */}

			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[32px] p-7 md:p-8">
					{/* TOP */}

					<div className="text-center mb-8">
						<div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-5">
							<ShieldCheck className="w-4 h-4" />
							Create Account
						</div>

						<h1 className="text-3xl font-bold text-white">Join BiteRush</h1>

						<p className="text-gray-400 mt-3 text-sm">
							Create your account and start ordering delicious meals.
						</p>
					</div>

					{/* FORM */}

					<form onSubmit={handleRegister} className="space-y-5">
						{/* NAME */}

						<div>
							<label className="text-sm text-gray-400 mb-2 block">
								Full Name
							</label>

							<div className="relative">
								<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

								<input
									type="text"
									required
									placeholder="Enter your name"
									value={form.name}
									onChange={(e) =>
										setForm({
											...form,
											name: e.target.value,
										})
									}
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
										focus:border-orange-500/40
										transition-all
									"
								/>
							</div>
						</div>

						{/* EMAIL */}

						<div>
							<label className="text-sm text-gray-400 mb-2 block">
								Email Address
							</label>

							<div className="relative">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

								<input
									type="email"
									required
									placeholder="Enter your email"
									value={form.email}
									onChange={(e) =>
										setForm({
											...form,
											email: e.target.value,
										})
									}
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
										focus:border-orange-500/40
										transition-all
									"
								/>
							</div>
						</div>

						{/* PASSWORD */}

						<div>
							<label className="text-sm text-gray-400 mb-2 block">
								Password
							</label>

							<div className="relative">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

								<input
									type={showPassword ? "text" : "password"}
									required
									placeholder="Create password"
									value={form.password}
									onChange={(e) =>
										setForm({
											...form,
											password: e.target.value,
										})
									}
									className="
										w-full
										h-14
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-12
										pr-12
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
										transition-all
									"
								/>

								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						{/* CONFIRM PASSWORD */}

						<div>
							<label className="text-sm text-gray-400 mb-2 block">
								Confirm Password
							</label>

							<div className="relative">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

								<input
									type={showConfirmPassword ? "text" : "password"}
									required
									placeholder="Confirm password"
									value={form.confirmPassword}
									onChange={(e) =>
										setForm({
											...form,
											confirmPassword: e.target.value,
										})
									}
									className="
										w-full
										h-14
										rounded-2xl
										bg-white/[0.03]
										border border-white/10
										pl-12
										pr-12
										text-white
										placeholder:text-gray-500
										outline-none
										focus:border-orange-500/40
										transition-all
									"
								/>

								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
								>
									{showConfirmPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						{/* BUTTON */}

						<button
							type="submit"
							disabled={loading}
							className="
								w-full
								h-14
								rounded-2xl
								bg-orange-500
								hover:bg-orange-600
								disabled:opacity-50
								disabled:cursor-not-allowed
								text-white
								font-semibold
								transition-all
								duration-300
								shadow-xl
								shadow-orange-500/20
								flex items-center justify-center gap-2
								mt-2
							"
						>
							{loading ? "Creating Account..." : "Create Account"}

							<ArrowRight className="w-5 h-5" />
						</button>
					</form>

					{/* FOOTER */}

					<div className="mt-7 text-center">
						<p className="text-gray-400 text-sm">
							Already have an account?{" "}
							<Link
								href="/auth/login"
								className="text-orange-400 hover:text-orange-300 font-medium"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
