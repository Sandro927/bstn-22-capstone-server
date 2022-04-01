const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authorize = require("../middleware/authorize");



router.post('/register', (req, res) => {
    const { name, username, password } = req.body;
    //Handle empty fields
    if (!name || !username || !password) {
        return res.status(400).send({
            message: "Please enter the required fields"
        })
    }
    //hash the password
    const hashedPassword = bcrypt.hashSync(password, 10)

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
        .catch(() => {
            //need to handle an already Registered user
            res.status(500).send({
                message: "Error registering user"
            })
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

   //Handle empty fields
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter the required fields"
        })
    }

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
        .catch(() => {
            res.status(400).send({
                message: "Username is not valid"
            })
        })
})

router.get('/current', authorize, (req, res) => {

    knex('users')
        .where({ username: req.decoded.username })
        .first()
        .then(user => {
            delete user.password;

            //send user data
            res.json(user)
        })

})

module.exports = router;