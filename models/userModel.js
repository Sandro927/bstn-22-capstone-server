const knex = require("knex")(require('../knexfile'));
const bcrypt = require('bcrypt');
const e = require("express");
const jwt = require('jsonwebtoken');

exports.addUser = (req, res, name, username, hashedPassword) => {
    knex('users')
        .insert({
            name: name,
            username: username, 
            password: hashedPassword
        })
        .then(() => {
            
            res.status(201).send({
                message: "Registered Successfully"
            })
        })
        .catch((err) => {
            //need to handle an already Registered user
            console.log(err)
            res.status(500).send({
                message: "Error registering user"
            })
        })
}

exports.findUser = (req, res, username, password) => {
    knex('users')
        .where({ username: username })
        .first()
        .then(user => {
            const isPasswordCorrent = bcrypt.compareSync(password, user.password)
            //if incorrect, send an error
            if (!isPasswordCorrent) {
                return res.status(400).send({
                    message: "Invalid Password. Please try again"
                })
            }

            //if correct, issue a JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                'abcdefghijklmnopqrstuvwxyz1234567890',
                {
                    expiresIn: '24h'
                }
            )

            res.status(200).json({ token: token })

        })
        .catch((err) => {
            console.log(err)
            res.status(405).send({
                message: "Username is not valid"
            })
        })
}
    
exports.getCurrentuser = (req, res) => {
    knex('users')
        .where({ username: req.decoded.username })
        .first()
        .then(user => {
            delete user.password;
            //send user data
            res.json(user)
        })
}

exports.getUserDashboard = (req, res, userId) => {
    // knex('users')
    //     .where({  })
}

exports.getUserGameData = (req, res, userId) => {
    knex('user_game_data')
        .select(
            "user_game_data.*",
            "users.userAvatar"
        )
        .join('users', 'users.userId', 'user_game_data.game_data_user_id')
        .where({game_data_user_id: userId})
        .first()
        .then(gameData => {
            //send user data
            res.json(gameData);
        })
}

exports.createUserGameData = (req, res, userId) => {
    knex('user_game_data')
        .insert({
            game_data_user_id: userId
        })
        .then(() => {
            return res.status(201).send({
                message: "Created Successfully"
            })
        })
        
}

exports.updateUserGameData = (req, res, userId, bio, userAvatar, OriginUsername, DiscordUsername, PSNUsername, NintendoUsername, 
    SteamUsername, DivisionUsername, XboxUsername, WoWUsername, OSRSUsername, SplitgateUsername) => {
    if (bio || userAvatar) {
      knex('user_game_data')
        .where('game_data_user_id', userId)
        .update({
            bio:bio,
            userAvatar: userAvatar
        })
        .then(() => {
            return res.status(201).send({
                message: "Updated Successfully"
            })
        })
    } else {
        knex('user_game_data')
        .where('game_data_user_id', userId)
        .update({
            origin_username: OriginUsername,
            discord_username: DiscordUsername,
            psn_username: PSNUsername,
            nintendo_username: NintendoUsername,
            steam_username: SteamUsername,
            division_username: DivisionUsername,
            xbox_username: XboxUsername,
            wow_username: WoWUsername,
            osrs_username: OSRSUsername,
            splitgate_username: SplitgateUsername,
        })
        .then(() => {
            return res.status(201).send({
                message: "Updated Successfully"
            })
        })
    }
   
}

exports.updateUser = (req, res, userId, userAvatar) => {
    knex('users')
    .where('userId', userId)
    .update({userAvatar: userAvatar})
    .then(() => {
        return res.status(201).send({
            message: "Updated Successfully"
        })
    })
}

exports.getAvatar = (req, res, userId) => {
    knex('users')
    .select('userAvatar')
    .first()
    .where('userId', userId)
    .then(user => {
        delete user.password;
        //send user data
        res.json(user)
    })
}