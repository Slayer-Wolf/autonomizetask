const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		location: String,
		blog: String,
		bio: String,
		public_repos: Number,
		public_gists: Number,
		followers: Number,
		following: Number,
		created_at: Date,
		friends: [{ type: String }], // Array of usernames who are friends
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
