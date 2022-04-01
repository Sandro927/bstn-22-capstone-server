const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.createUser = (req, res) => {
    const { name, username, password } = req.body;
    //Handle empty fields
    if (!name || !username || !password) {
        return res.status(400).send({
            message: "Please enter the required fields"
        })
    }
    //hash the password
    const hashedPassword = bcrypt.hashSync(password, 10)
    userModel.addUser(req, res, name, username, hashedPassword);
}

exports.verifyUser = (req, res) => {
    const { username, password } = req.body;
   //Handle empty fields
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter the required fields"
        })
    }
    
    userModel.findUser(req, res, username, password);
}

exports.getCurrentUser = (req, res) => {
    userModel.getCurrentuser(req, res);
}