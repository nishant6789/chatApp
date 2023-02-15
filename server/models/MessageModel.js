const mongoose = require('mongoose');
const {Schema} = mongoose
const messageSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("chats", messageSchema)
