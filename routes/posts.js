const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost)

router.route('/:postId/like')
    .put(postController.incrementPostLikes)

router.route('/:postId/comments')
    .get(postController.getComments)
    .post(postController.createComment)

router.route('/:postId/comments/:commentId/like')
    .put(postController.incrementCommentLikes)

router.route('/:userId')
    .get(postController.getSingleUserPosts)

module.exports = router;