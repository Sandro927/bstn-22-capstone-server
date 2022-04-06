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

exports.getDashboard = (req, res) => {
    const { userId } = req.params;
    userModel.getUserDashboard(req, res, userId);
}

exports.getUserProfile = (req, res) => {
    const { userId } = req.params;
    userModel.getUserGameData(req, res, userId);
}

exports.createUserProfile = (req, res) => {
    const { userId } = req.params;
    userModel.createUserGameData(req, res, userId);
}

exports.updateUserProfile = (req, res) => {
    const { userId } = req.params;
    const { bio, userAvatar, OriginUsername, DiscordUsername, PSNUsername, NintendoUsername, 
        SteamUsername, DivisionUsername, XboxUsername, WoWUsername, OSRSUsername, 
        SplitgateUsername  } = req.body;
    console.log(req.body);
    userModel.updateUserGameData(req, res, userId, bio, userAvatar, OriginUsername, DiscordUsername, PSNUsername, NintendoUsername, 
        SteamUsername, DivisionUsername, XboxUsername, WoWUsername, OSRSUsername, SplitgateUsername);
}

exports.updateUser = (req, res) => {
    const { userId } = req.params;
    const { userAvatar } = req.body
    userModel.updateUser(req, res, userId, userAvatar);
}

exports.getUserAvatar = (req, res) => {
    const { userId } = req.params;
    userModel.getAvatar(req, res, userId);
}