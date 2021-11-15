const mongoose = require('mongoose')

const status={
    UNR:'Unresolved',
    RES:'Resolved'
}

// Define schema for complaint
const complaint = new mongoose.Schema({
    title: {
        type: String
    },
    descriptions:{
        type:String
    },
    complaintStatus:{
        type:status
    },
    filedBy:
        {type:String}
    ,
},
{timestamps:true}
);


var Complaint = mongoose.model('Complaint', complaint)
module.exports =Complaint