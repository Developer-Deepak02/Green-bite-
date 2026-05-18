import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	category?: string;
	preparationTime?: number;
}

interface CartStore {
	items: CartItem[];
	// ACTIONS
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	increaseQty: (id: string) => void;
	decreaseQty: (id: string) => void;
	clearCart: () => void;

	// HELPERS
	getTotalItems: () => number;
	getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			// ADD TO CART
			addToCart: (item) =>
				set((state) => {
					const existing = state.items.find((i) => i._id === item._id);
					// IF ITEM EXISTS
					if (existing) {
						return {
							items: state.items.map((i) =>
								i._id === item._id
									? {
											...i,
											quantity: i.quantity + 1,
										}
									: i,
							),
						};
					}

					// ADD NEW ITEM

					return {
						items: [
							...state.items,
							{
								...item,
								quantity: item.quantity || 1,
							},
						],
					};
				}),

			// REMOVE ITEM

			removeFromCart: (id) =>
				set((state) => ({
					items: state.items.filter((i) => i._id !== id),
				})),

			// INCREASE QUANTITY

			increaseQty: (id) =>
				set((state) => ({
					items: state.items.map((i) =>
						i._id === id
							? {
									...i,
									quantity: i.quantity + 1,
								}
							: i,
					),
				})),

			// DECREASE QUANTITY

			decreaseQty: (id) =>
				set((state) => ({
					items: state.items
						.map((i) =>
							i._id === id
								? {
										...i,
										quantity: Math.max(i.quantity - 1, 0),
									}
								: i,
						)
						.filter((i) => i.quantity > 0),
				})),

			// CLEAR CART

			clearCart: () =>
				set({
					items: [],
				}),

			// TOTAL ITEMS

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			// SUBTOTAL

			getSubtotal: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0,
				);
			},
		}),
		{
			name: "biterush-cart",
		},
	),
);
