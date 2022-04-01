const knex = require("knex")(require('../knexfile'));

exports.createPost = (req, res) => {
    
    console.log(req.body.userId)

    return res.status(201).send({
        message: 'Created!'
    })
}