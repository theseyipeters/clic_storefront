import axios from "axios";

const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default API;
