import AppealData from "../models/appeals.js";

export const getAppeals = async (req, res) => {
	try {
		const allAppeals = await AppealData.find();

		res.status(200).json(allAppeals);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createAppeals = async (req, res) => {
	const appeals = req.body;

	const newAppeals = new AppealData(appeals);

	try {
		await newAppeals.save();
		res.status(201).json(newAppeals);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateAppeals = async (req, res) => {
	const dueDate = req.body.dueDate;
	const id = req.body.id;
	try {
		await AppealData.updateOne({ _id: id }, { dueDate });
	} catch (error) {
		console.log(error);
	}
	res.send("updated");
};

export const deleteAppeals = async (req, res) => {
	const id = req.body.id;
	console.log(id);
	try {
		await AppealData.deleteOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
	res.send("deleted");
};
