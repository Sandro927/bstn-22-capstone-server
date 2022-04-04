const knex = require("knex")(require('../knexfile'));
const bcrypt = require('bcrypt');
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