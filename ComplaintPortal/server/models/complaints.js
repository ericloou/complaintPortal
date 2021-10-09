import Mongoose from 'mongoose';

//create a function to get an object
const complaintSchema = Mongoose.Schema({
    name: String,
    idNum: String,
    email: String,
    message: String,
    ticketNumber: Number,
    
})

const complaint = Mongoose.model('complaint', complaintSchema);

export default complaint;