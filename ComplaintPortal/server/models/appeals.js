import Mongoose from "mongoose";

//create a function to get an object
const appealSchema = Mongoose.Schema(
	{
		name: { type: String },
		idNum: { type: String },
		unit: { type: String },
		email: { type: String },
		message: { type: String },
		type: { type: String },
		ticketNumber: { type: String },
		date: { type: String },
		dueDate: { type: String },
	},
	{ timestamp: true }
);

const appeal = Mongoose.model("appeal", appealSchema);

export default appeal;
