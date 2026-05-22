import { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<ProtectedRoute>
			<AdminLayout>{children}</AdminLayout>
		</ProtectedRoute>
	);
}
