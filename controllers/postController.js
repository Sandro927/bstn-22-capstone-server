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

exports.incrementPostLikes = (req, res) => {
    const { postId } = req.params;
    const { likeCount } = req.body
    postModel.incrementPostLikes(req, res, postId, likeCount);
}

exports.getComments = (req, res) => {
    const { postId } = req.params;
    postModel.getComments(req, res, postId);
}

exports.createComment = (req, res) => {
    const { commentContent, userId, postId } = req.body
    postModel.addComment(req, res, commentContent, userId, postId);
}

exports.incrementCommentLikes = (req, res) => {
    const { postId, commentId } = req.params;
    const { likeCount } = req.body
    postModel.incrementCommentLikes(req, res, postId, likeCount, commentId);
}