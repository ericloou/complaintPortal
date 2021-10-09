import Mongoose from 'mongoose';

//create a function to get an object
const appealSchema = Mongoose.Schema({
    name: String,
    idNum: String,
    unit: String,
    email: String,
    message: String,
    type: String,
    ticketNumber: Number,
})

const appeal = Mongoose.model('appeal', appealSchema);

export default appeal;