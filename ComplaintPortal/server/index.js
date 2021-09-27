import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import complaintRoutes from './routes/complaints.js';
import userRoutes from './routes/users.js';
import appealRoutes from './routes/appeals.js';
import feedbackRoutes from './routes/feedbacks.js';

const app = express();

app.use(bodyParser.json({limit: "20mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended:true}));

app.use(cors());
app.use('/complaints', complaintRoutes);
app.use('/users', userRoutes);
app.use('/appeals', appealRoutes);
app.use('/feedbacks', feedbackRoutes);

//database url
const CONNECTION_URL = 'mongodb+srv://ericlou:Enter012@database.ndrft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//database will either run on port environment or port 5000
const PORT = process.env.PORT || 5000;

//creation of database connection print connection successful message or throw error if failed
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));


