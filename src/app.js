const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("./models/User");
const db = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// API to save GitHub user data
app.post("/users/:username", async (req, res) => {
	const { username } = req.params;
	let user = await User.findOne({ username });

	if (!user) {
		const response = await axios.get(
			`https://api.github.com/users/${username}`,
		);
		const githubData = response.data;

		user = new User({
			username: githubData.login,
			location: githubData.location,
			blog: githubData.blog,
			bio: githubData.bio,
			public_repos: githubData.public_repos,
			public_gists: githubData.public_gists,
			followers: githubData.followers,
			following: githubData.following,
			created_at: githubData.created_at,
		});
		await user.save();
	}

	res.json(user);
});

// API to find mutual friends
app.get("/users/:username/friends", async (req, res) => {
	const { username } = req.params;
	const user = await User.findOne({ username });

	if (!user) {
		return res.status(404).send("User not found");
	}

	const followers = await axios.get(
		`https://api.github.com/users/${username}/followers`,
	);
	const following = await axios.get(
		`https://api.github.com/users/${username}/following`,
	);

	const followersSet = new Set(
		followers.data.map((follower) => follower.login),
	);
	const friends = following.data.filter((followingUser) =>
		followersSet.has(followingUser.login),
	);
	user.friends = friends.map((friend) => friend.login);

	await user.save();
	res.json(user.friends);
});

// API to search users
app.get("/users", async (req, res) => {
	const { username, location, blog, bio } = req.query;
	const query = {};

	if (username) query.username = new RegExp(username, "i");
	if (location) query.location = new RegExp(location, "i");
	if (blog) query.blog = new RegExp(blog, "i");
	if (bio) query.bio = new RegExp(bio, "i");

	const users = await User.find(query);
	res.json(users);
});

// API to soft delete a user
app.delete("/users/:username", async (req, res) => {
	const { username } = req.params;
	const user = await User.findOne({ username });

	if (!user) {
		return res.status(404).send("User not found");
	}

	user.deleted = true;
	await user.save();
	res.send("User soft deleted");
});

// API to update user fields
app.put("/users/:username", async (req, res) => {
	const { username } = req.params;
	const updates = req.body;

	const user = await User.findOneAndUpdate({ username }, updates, {
		new: true,
	});

	if (!user) {
		return res.status(404).send("User not found");
	}

	res.json(user);
});

// API to list all users sorted by a field
app.get("/users/sort/:field", async (req, res) => {
	const { field } = req.params;
	const users = await User.find().sort({ [field]: 1 });
	res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
