"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function LoginPage() {
	const router = useRouter();

	const { setAuth } = useAuthStore();

	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	/* LOGIN */

const handleLogin = async (e: React.FormEvent) => {
	e.preventDefault();

	try {
		setLoading(true);

		const res = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(form),
		});

		const data = await res.json();

		if (!res.ok) {
			toast.error(data.message || "Login failed");

			return;
		}

		/* SAVE AUTH */

		setAuth(data.user, data.token);

		toast.success("Login successful 🎉");

		/* REDIRECT */

		setTimeout(() => {
			router.push("/");
		}, 1000);
	} catch (error) {
		console.error(error);

		toast.error("Something went wrong");
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
							Secure Login
						</div>

						<h1 className="text-3xl font-bold text-white">Welcome Back</h1>

						<p className="text-gray-400 mt-3 text-sm">
							Login to continue ordering your favorite meals.
						</p>
					</div>

					{/* FORM */}

					<form onSubmit={handleLogin} className="space-y-5">
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
									placeholder="Enter your password"
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
							{loading ? "Logging In..." : "Login"}

							<ArrowRight className="w-5 h-5" />
						</button>
					</form>

					{/* FOOTER */}

					<div className="mt-7 text-center">
						<p className="text-gray-400 text-sm">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="text-orange-400 hover:text-orange-300 font-medium"
							>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
