const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route('/')
    .post(postController.createPost)


module.exports = router;