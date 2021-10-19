import Mongoose from "mongoose";

//create a function to get an object
const complaintSchema = Mongoose.Schema(
  {
    email: { type: String },
    message: { type: String },
    ticketNumber: { type: String },
    date: { type: String },
    dueDate: {type: String},
  },
  { timestamp: true }
);

const complaint = Mongoose.model("complaint", complaintSchema);

export default complaint;
