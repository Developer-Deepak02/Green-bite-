import { ReactNode } from "react";

import AdminLayout from "@/components/admin/AdminLayout";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return <AdminLayout>{children}</AdminLayout>;
}
