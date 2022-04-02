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
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send("Error retrieving all posts");
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

exports.incrementLikes = (req, res, postId, likeCount) => {
    knex('posts')
        .update({likeCount: likeCount})
        .where({postId: postId})
        .then(() => {
            return res.status(203).send({
                message: 'Likes incremented'
            })
        })
}