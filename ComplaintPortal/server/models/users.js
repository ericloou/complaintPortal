import Mongoose from 'mongoose';

//create a function to get an object
const usersSchema = Mongoose.Schema({
    username: String,
    password: String,
})

const users = Mongoose.model('users', usersSchema);

export default users;