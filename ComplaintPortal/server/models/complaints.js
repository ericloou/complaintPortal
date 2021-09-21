import Mongoose from 'mongoose';

//create a function to get an object
const complaintSchema = Mongoose.Schema({
    name: String,
    idNum: Number,
    email: String,
    message: String,
    type: String,
    ticketNumber: Number,
    section: {
        type: String,
        default: 'Fill in'
    }
    
})

const complaint = Mongoose.model('complaint', complaintSchema);

export default complaint;