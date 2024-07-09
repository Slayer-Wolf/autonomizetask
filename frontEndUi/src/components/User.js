import React, { useState } from "react";
import { fetchUser } from "../services/api";
import "./User.css";

const User = ({ onUserSelected }) => {
	const [username, setUsername] = useState("");
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);

	const handleSearch = async () => {
		try {
			const data = await fetchUser(username);
			setUserData(data);
			setError(null);
			onUserSelected(username);
		} catch (err) {
			setError("User not found or error fetching data");
			setUserData(null);
		}
	};

	return (
		<div className="user-search">
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Enter GitHub username"
			/>
			<button onClick={handleSearch}>Search</button>

			{error && <p>{error}</p>}

			{userData && (
				<div className="user-info">
					<img src={userData.avatar_url} alt="User Avatar" />
					<h2>{userData.login}</h2>
					<p>Location: {userData.location}</p>
					<p>
						Blog: <a href={userData.blog}>{userData.blog}</a>
					</p>
					<p>Bio: {userData.bio}</p>
					<p>Public Repos: {userData.public_repos}</p>
					<p>Public Gists: {userData.public_gists}</p>
					<p>Followers: {userData.followers}</p>
					<p>Following: {userData.following}</p>
				</div>
			)}
		</div>
	);
};

export default User;
