// const register = require("../service/users")

const router = require("express").Router();
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

const register = async(req, res, next) => {
    try {
        const { name, username, password } = req.body;
        const userNameCheck = await User.findOne({username});
        if(userNameCheck) {
            return res.json({success : 0, errorMessage : "This username already taken"})
        }

        const securedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
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

const login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.json({success : 0, errorMessage : "Incorrect username or password"});
        } 

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.json({success : 0, errorMessage : "Incorrect username or password"});
        }

        delete user.password;
        return res.json({success : 1, message : user});
    } catch (error) {
        console.log(error.message);
        return res.json({success : 0, errorMessage : "Error in the backend"})
    }

}

// const fetchUsers = async(req, res, next) => {
//     try {
//         const users = await User.find({})
//     } catch(error) {
//         console.log(error.message);
//         return res.json({success : 0, errorMessage : "Error in the backend"})
//     }
// }
router.post("/register", register);
router.post("/login", login);
module.exports = router