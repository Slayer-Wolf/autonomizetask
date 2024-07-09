import React from "react";
import "./RepositoryDetails.css";

const RepositoryDetails = ({ repo }) => {
	return (
		<div className="repository-details">
			<h2>{repo.name}</h2>
			<p>{repo.description}</p>
			<p>Language: {repo.language}</p>
			<p>Stars: {repo.stargazers_count}</p>
			<p>Forks: {repo.forks_count}</p>
			<p>
				<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
					View on GitHub
				</a>
			</p>
		</div>
	);
};

export default RepositoryDetails;
