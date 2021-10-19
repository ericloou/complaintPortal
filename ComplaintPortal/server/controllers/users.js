import usersData from "../models/users.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	//   const newUsers = new usersData(users);

	console.log(username);

	try {
		const userExists = await usersData.findOne({ username: username });
		console.log(userExists);
		if (userExists) {
			res.status(400);
			throw new Error("User Already Exists!");
		}
		const newUsers = await usersData.create({
			username: username,
			password: password,
		});

		console.log(newUsers);

		if (newUsers) {
			res.status(201).json({
				_id: newUsers._id,
				username: newUsers.username,
				password: newUsers.password,
				token: generateToken(newUsers.username),
			});
		} else {
			res.status(400);
			throw new Error("An Error Has Occured!");
		}
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

export const getUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await usersData.findOne({ username: username });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				username: user.username,
				password: user.password,
				token: generateToken(user.username),
			});
		} else {
			res.status(400);
			throw new Error("Invalid LoginID or Password!");
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export default getUser;
