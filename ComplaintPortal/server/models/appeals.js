import Mongoose from 'mongoose';

//create a function to get an object
const appealSchema = Mongoose.Schema({
    name: String,
    idNum: String,
    unit: String,
    message: String,
    ticketNumber: String,
})

const appeal = Mongoose.model('appeal', appealSchema);

export default appeal;