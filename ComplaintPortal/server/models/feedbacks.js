import Mongoose from "mongoose";

//create a function to get an object
const feedbackSchema = Mongoose.Schema(
  {
    name: String,
    idNum: String,
    unit: String,
    message: String,
    ticketNumber: String,
  },
  { timestamp: true }
);

const feedback = Mongoose.model("feedback", feedbackSchema);

export default feedback;
