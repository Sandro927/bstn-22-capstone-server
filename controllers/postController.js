const knex = require("knex")(require('../knexfile'));
const postModel = require('../models/postModel');


exports.getAllPosts = (req, res) => {
    postModel.fetchAllPosts(res);
}

exports.createPost = (req, res) => {
    const { postContent, postImage, userId  } = req.body;
    if (!postContent) {
        return res.status(400).send({
            message: "Please enter the required fields"
        })
    }
    postModel.addPost(postContent, postImage, userId, res);
}

exports.incrementLikes = (req, res) => {
    const { postId } = req.params;
    const { likeCount } = req.body
    postModel.incrementLikes(req, res, postId, likeCount);
}