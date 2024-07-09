import React, { useState } from "react";
import axios from "axios";

function UserInput({ setUserData, setRepos, setView }) {
	const [username, setUsername] = useState("");

	const handleSearch = async () => {
		try {
			const userResponse = await axios.get(
				`https://api.github.com/users/${username}`,
			);
			const reposResponse = await axios.get(userResponse.data.repos_url);
			setUserData(userResponse.data);
			setRepos(reposResponse.data);
			setView("repos");
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Enter GitHub username"
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
}

export default UserInput;
