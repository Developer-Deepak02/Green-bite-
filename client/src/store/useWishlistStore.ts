"use client";

import { create } from "zustand";
import { toast } from "sonner";

interface WishlistItem {
	_id: string;

	name: string;

	price: number;

	image?: string;

	category?: {
		name: string;
	};

	ratingAverage?: number;

	preparationTime?: number;

	isAvailable?: boolean;
}

interface WishlistStore {
	items: WishlistItem[];

	loading: boolean;

	fetchWishlist: () => Promise<void>;

	addToWishlist: (menuItemId: string) => Promise<void>;

	removeFromWishlist: (menuItemId: string) => Promise<void>;

	isWishlisted: (menuItemId: string) => boolean;
}

const API_URL = "http://localhost:5000/api/wishlist";

export const useWishlistStore = create<WishlistStore>((set, get) => ({
	items: [],

	loading: false,

	// ================= FETCH =================

	fetchWishlist: async () => {
		try {
			set({ loading: true });

			const token = localStorage.getItem("token");

			if (!token) return;

			const res = await fetch(API_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			set({
				items: Array.isArray(data) ? data : [],
			});
		} catch (error) {
			console.error(error);

			toast.error("Failed to load wishlist");
		} finally {
			set({ loading: false });
		}
	},

	// ================= ADD =================
	addToWishlist: async (menuItemId) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				toast.error("Please login first");

				return;
			}

			const existing = get().items.find((item) => item._id === menuItemId);

			const res = await fetch(`${API_URL}/${menuItemId}`, {
				method: "POST",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				toast.error("Failed to add to wishlist");

				return;
			}

			await get().fetchWishlist();

			if (!existing) {
				toast.success("Added to wishlist ❤️");
			}
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		}
	},

	// ================= REMOVE =================

	removeFromWishlist: async (menuItemId) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				toast.error("Please login first");

				return;
			}

			const res = await fetch(`${API_URL}/${menuItemId}`, {
				method: "DELETE",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) {
				toast.error("Failed to remove from wishlist");
				return;
			}
			set({
				items: get().items.filter((item) => item._id !== menuItemId),
			});
			toast.success("Removed from wishlist");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	},

	// ================= CHECK =================

	isWishlisted: (menuItemId) => {
		return get().items.some((item) => item._id === menuItemId);
	},
}));
