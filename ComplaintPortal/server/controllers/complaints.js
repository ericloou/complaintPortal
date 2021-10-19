import ComplaintData from "../models/complaints.js";

export const getComplaints = async (req, res) => {
	try {
		const allComplaints = await ComplaintData.find();
		res.status(200).json(allComplaints);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createComplaint = async (req, res) => {
	const complaint = req.body;

	const newComplaint = new ComplaintData(complaint);

	try {
		await newComplaint.save();
		res.status(201).json(newComplaint);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateComplaint = async (req, res) => {
	const dueDate = req.body.dueDate;
	const id = req.body.id;
	try {
		await ComplaintData.updateOne({ _id: id }, { dueDate });
	} catch (error) {
		console.log(error);
	}
	res.send("updated");
};

export const deleteComplaints = async (req, res) => {
	const id = req.body.id;
	console.log(id);
	try {
		await ComplaintData.deleteOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
	res.send("deleted");
};
