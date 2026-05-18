"use client";

import { create } from "zustand";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

type AuthState = {
	user: User | null;

	token: string | null;

	isAuthenticated: boolean;

	isLoading: boolean;

	// ACTIONS

	setAuth: (user: User, token: string) => void;

	logout: () => void;

	loadUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	token: null,

	isAuthenticated: false,

	isLoading: true,

	// SET AUTH

	setAuth: (user, token) => {
		if (typeof window !== "undefined") {
			localStorage.setItem("token", token);

			localStorage.setItem("user", JSON.stringify(user));
		}

		set({
			user,
			token,
			isAuthenticated: true,
			isLoading: false,
		});
	},

	// LOGOUT

	logout: () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("token");

			localStorage.removeItem("user");
		}

		set({
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: false,
		});
	},

	// LOAD USER FROM LOCAL STORAGE

	loadUser: () => {
		if (typeof window === "undefined") {
			return;
		}

		try {
			const token = localStorage.getItem("token");

			const user = localStorage.getItem("user");

			if (token && user) {
				set({
					token,
					user: JSON.parse(user),
					isAuthenticated: true,
					isLoading: false,
				});
			} else {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error(error);

			localStorage.removeItem("token");

			localStorage.removeItem("user");

			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			});
		}
	},
}));
