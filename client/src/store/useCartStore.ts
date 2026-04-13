import { create } from "zustand";

interface CartItem {
	_id: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartStore {
	items: CartItem[];

	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	increaseQty: (id: string) => void;
	decreaseQty: (id: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
	items: [],

	addToCart: (item) =>
		set((state) => {
			const existing = state.items.find((i) => i._id === item._id);

			// If item already exists → increase quantity
			if (existing) {
				return {
					items: state.items.map((i) =>
						i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
					),
				};
			}

			// Otherwise add new item
			return {
				items: [...state.items, { ...item, quantity: 1 }],
			};
		}),

	removeFromCart: (id) =>
		set((state) => ({
			items: state.items.filter((i) => i._id !== id),
		})),

	increaseQty: (id) =>
		set((state) => ({
			items: state.items.map((i) =>
				i._id === id ? { ...i, quantity: i.quantity + 1 } : i,
			),
		})),

	decreaseQty: (id) =>
		set((state) => ({
			items: state.items
				.map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
				.filter((i) => i.quantity > 0),
		})),

	clearCart: () => set({ items: [] }),
}));
