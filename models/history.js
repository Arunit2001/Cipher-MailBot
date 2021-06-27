const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const Schema   = mongoose.Schema;

// Create a schema
const historySchema = new Schema({
    to : {
        type : String,
        lowercase : true
    },
    cc : [{
        email : String
    }],
    subject : {
        type : String
    },
    content : {
        type : String
    },
    frequency: {
        type : Number//0- only once|| 1- every 20-30 sec || 2- weekly || 3- monthly || 4- yearly
    },
    from : {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String,
        name: String
    },
    recurring :{
        type : Boolean
    },
  createdAt: String
});

const History = mongoose.model('history', historySchema);

// Export the model
module.exports = History;