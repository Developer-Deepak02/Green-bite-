const BASE_URL = "http://localhost:5000/api";

export const api = {
	getCategories: async () => {
		const res = await fetch(`${BASE_URL}/categories`);
		return res.json();
	},

	getMenu: async (query = "") => {
		const res = await fetch(`${BASE_URL}/menu${query}`);
		return res.json();
	},
};
