const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    
    console.log(req.body.user)


    return res.status(201).send({
        message: 'Created!'
    })
})


module.exports = router;