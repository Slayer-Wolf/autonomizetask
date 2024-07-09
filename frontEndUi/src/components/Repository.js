import React, { useState, useEffect } from "react";
import { fetchRepositories } from "../services/api";
import "./Repository.css";

const Repository = ({ username }) => {
	const [repositories, setRepositories] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getRepositories = async () => {
			try {
				const data = await fetchRepositories(username);
				setRepositories(data);
				setError(null);
			} catch (err) {
				setError("Error fetching repositories data");
			}
		};

		getRepositories();
	}, [username]);

	return (
		<div className="repository-list">
			<h2>Repositories of {username}</h2>
			{error && <p>{error}</p>}
			<ul>
				{repositories.map((repo) => (
					<li key={repo.id}>
						<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
							{repo.name}
						</a>
						<p>{repo.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Repository;
