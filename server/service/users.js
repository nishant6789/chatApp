const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

module.exports.register = async(req, res, next) => {
    try {
        const { name, userName, password } = req.body;
        const userNameCheck = await User.findOne({userName});
        if(userNameCheck) {
            return res.json({success : 0, errorMessage : "This username already taken"})
        }

        const securedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            userName,
            password : securedPassword
        });

        delete user.password;

        return res.json({success : 1, message : user});
    } catch (error) {
        next(error)
        console.log(error.message)
        return res.json({success : 0, errorMessage : "Error in the backend"})
    }
}