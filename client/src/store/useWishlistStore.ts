"use client";

import { create } from "zustand";

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
		} finally {
			set({ loading: false });
		}
	},

	// ================= ADD =================

	addToWishlist: async (menuItemId) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			await fetch(`${API_URL}/${menuItemId}`, {
				method: "POST",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			await get().fetchWishlist();
		} catch (error) {
			console.error(error);
		}
	},

	// ================= REMOVE =================

	removeFromWishlist: async (menuItemId) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			await fetch(`${API_URL}/${menuItemId}`, {
				method: "DELETE",

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			set({
				items: get().items.filter((item) => item._id !== menuItemId),
			});
		} catch (error) {
			console.error(error);
		}
	},

	// ================= CHECK =================

	isWishlisted: (menuItemId) => {
		return get().items.some((item) => item._id === menuItemId);
	},
}));
