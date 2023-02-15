const mongoose = require('mongoose');
const {Schema} = mongoose
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        min : 3,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 3
    }
})

module.exports = mongoose.model("Users", userSchema)
