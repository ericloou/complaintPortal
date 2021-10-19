import Mongoose from "mongoose";

//create a function to get an object
const feedbackSchema = Mongoose.Schema(
	{
		email: { type: String },
		message: { type: String },
		ticketNumber: { type: String },
		date: { type: String },
		dueDate: { type: String },
	},
	{ timestamp: true }
);

const feedback = Mongoose.model("feedback", feedbackSchema);

export default feedback;
