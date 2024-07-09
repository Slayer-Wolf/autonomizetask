import React, { useState } from "react";
import User from "./components/User";
import Friends from "./components/Friends";
import Repository from "./components/Repository";
import RepositoryDetails from "./components/RepositoryDetails";
import "./App.css";

const App = () => {
	const [currentUsername, setCurrentUsername] = useState("");
	const [view, setView] = useState("user");
	const [selectedRepo, setSelectedRepo] = useState(null);

	const handleUserSelection = (username) => {
		setCurrentUsername(username);
		setView("repos");
	};

	const handleRepoClick = (repo) => {
		setSelectedRepo(repo);
		setView("repoDetails");
	};

	const handleBackToRepos = () => {
		setSelectedRepo(null);
		setView("repos");
	};

	const handleViewFriends = () => {
		setView("friends");
	};

	return (
		<div className="app">
			<h1>GitHub User Finder</h1>
			{view === "user" && <User onUserSelected={handleUserSelection} />}
			{view === "repos" && currentUsername && (
				<>
					<button onClick={handleViewFriends}>View Friends</button>
					<Repository
						username={currentUsername}
						onRepoClick={handleRepoClick}
					/>
				</>
			)}
			{view === "friends" && currentUsername && (
				<>
					<button onClick={() => setView("repos")}>Back to Repos</button>
					<Friends username={currentUsername} />
				</>
			)}
			{view === "repoDetails" && selectedRepo && (
				<>
					<button onClick={handleBackToRepos}>Back to Repos</button>
					<RepositoryDetails repo={selectedRepo} />
				</>
			)}
		</div>
	);
};

export default App;
