import Mongoose from "mongoose";

//create a function to get an object
const complaintSchema = Mongoose.Schema(
  {
    email: String,
    message: String,
    ticketNumber: Number,
    date: String,
  },
  { timestamp: true }
);

const complaint = Mongoose.model("complaint", complaintSchema);

export default complaint;
