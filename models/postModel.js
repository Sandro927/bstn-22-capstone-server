const knex = require("knex")(require('../knexfile'));

exports.fetchAllPosts = (res) => {
    knex('posts')
        .select(
            'users.username',
            'users.userId',
            'posts.postId',
            'posts.postContent',
            'posts.postImage',
            'posts.likeCount',
            'posts.postedAt'
        )
        .join('users', 'posts.post_user_id', 'users.userId')
        .orderBy('posts.postedAt', 'desc')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send("Error retrieving all posts");
        })
}

exports.fetchSingleUserPosts = (req, res, userId) => {
    knex('posts')
        .select(
            'users.username',
            'users.userId',
            'posts.postId',
            'posts.postContent',
            'posts.postImage',
            'posts.likeCount',
            'posts.postedAt'
        )
        .join('users', 'posts.post_user_id', 'users.userId')
        .where({'posts.post_user_id': userId})
        .orderBy('posts.postedAt', 'desc')
        .limit(5)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(507).send("Error retrieving all posts");
        })
}

exports.addPost = (postContent, postImage, userId, res) => {
    knex('posts')
        .insert({
            postContent: postContent,
            postImage: postImage || "", 
            post_user_id: userId
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

exports.incrementPostLikes = (req, res, postId, likeCount) => {
    knex('posts')
        .update({likeCount: likeCount})
        .where({postId: postId})
        .then(() => {
            return res.status(203).send({
                message: 'Likes incremented'
            })
        })
}

exports.getComments = (req, res, postId) => {
    knex('comments')
        .select(
            'users.username',
            'users.userId',
            'comments.commentId',
            'comments.commentContent',
            'comments.likeCount',
            'comments.commentedAt'
        )
        .join('users', 'comments.comment_user_id', 'users.userId')
        .where({comment_post_id: postId})
        .orderBy('comments.commentedAt', 'desc')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send("Error retrieving all posts");
        })
}

exports.addComment = (req, res, commentContent, userId, postId) => {
    knex('comments')
        .insert({
            commentContent: commentContent,
            comment_user_id: userId,
            comment_post_id: postId
        })
        .then(() => {
            res.status(201).send({
                message: "Commented Successfully"
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({
                message: "Error posting comments"
            })
        })
}

exports.incrementCommentLikes = (req, res, postId, likeCount, commentId) => {
    knex('comments')
        .update({likeCount: likeCount})
        .where({commentId: commentId, })
        .then(() => {
            return res.status(203).send({
                message: 'Likes incremented'
            })
        })
}