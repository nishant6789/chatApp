const router = require("express").Router();
const Chat = require("../models/MessageModel")

const addMessage = async(req, res, next) => {
    try {
        const {username,message} = req.body;
        const chat = await Chat.create({
            username,
            message
        });

        const allChats = await Chat.find({});
        return res.json({success : 1, message : allChats});
        
    } catch (error) {
        console.log(error.message);
        return res.json({success : 0, errorMessage : "Error in the Backend"});
    }
}

const fetchMessage = async(req, res, next) => {
    try {
        const allChats = await Chat.find({});
        return res.json({success : 1, message : allChats});
    } catch(error) {
        console.log(error.message);
        return res.json({success : 0, errorMessage : "Error in the Backend"});
    }
}
router.post("/addMessage", addMessage);
router.get("/fetchMessage", fetchMessage);

module.exports = router