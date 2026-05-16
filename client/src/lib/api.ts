import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// ================= TOKEN HANDLING =================

api.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

// ================= ERROR HANDLING =================

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.error("Unauthorized");
		}

		return Promise.reject(error);
	},
);
