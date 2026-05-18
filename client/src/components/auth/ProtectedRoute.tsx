"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuthStore();

	/* REDIRECT IF NOT LOGGED IN */

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/auth/login");
		}
	}, [isAuthenticated, isLoading, router]);

	/* LOADING */

	if (isLoading) {
		return (
			<section className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
				<div className="text-center">
					<div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
						<Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
					</div>

					<h2 className="text-2xl font-bold text-white">
						Checking Authentication
					</h2>

					<p className="text-gray-400 mt-2">Please wait a moment...</p>
				</div>
			</section>
		);
	}

	/* NOT AUTHENTICATED */

	if (!isAuthenticated) {
		return (
			<section className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
						<ShieldAlert className="w-8 h-8 text-red-400" />
					</div>

					<h2 className="text-3xl font-bold text-white">
						Authentication Required
					</h2>

					<p className="text-gray-400 mt-3">Please login to continue.</p>
				</div>
			</section>
		);
	}

	return <>{children}</>;
}
