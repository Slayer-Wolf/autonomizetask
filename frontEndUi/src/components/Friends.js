import React, { useState, useEffect } from "react";
import { fetchFollowers } from "../services/api";
import "./Friends.css";

const Friends = ({ username }) => {
	const [friends, setFriends] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getFriends = async () => {
			try {
				const data = await fetchFollowers(username);
				setFriends(data);
				setError(null);
			} catch (err) {
				setError("Error fetching friends data");
			}
		};

		getFriends();
	}, [username]);

	return (
		<div className="friends-list">
			<h2>Friends of {username}</h2>
			{error && <p>{error}</p>}
			<ul>
				{friends.map((friend) => (
					<li key={friend.login}>
						<img src={friend.avatar_url} alt={`${friend.login} Avatar`} />
						<span>{friend.login}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Friends;
