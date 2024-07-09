import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchUser = async (username) => {
	try {
		const response = await axios.post(`${API_URL}/users/${username}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
};

export const fetchRepositories = async (username) => {
	try {
		const response = await axios.get(`${API_URL}/users/${username}/repos`);
		return response.data;
	} catch (error) {
		console.error("Error fetching repositories data:", error);
		throw error;
	}
};

export const fetchFollowers = async (username) => {
	try {
		const response = await axios.get(`${API_URL}/users/${username}/followers`);
		return response.data;
	} catch (error) {
		console.error("Error fetching followers data:", error);
		throw error;
	}
};
