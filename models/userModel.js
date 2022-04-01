const knex = require("knex")(require('../knexfile'));

exports.addUser = (name, username, hashedPassword) => {
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
}
    