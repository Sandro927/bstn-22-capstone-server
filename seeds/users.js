/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt');

const sampleUsers = [
  {
    name: "John Smith",
    username: "JSmith123",
    password:  bcrypt.hashSync('password', 10)
  },
  {
    name: "Jane Dpe",
    username: "JDoe456",
    password:  bcrypt.hashSync('password', 10)
  },
  {
    name: "Steven Tyler",
    username: "Aero123",
    password:  bcrypt.hashSync('password', 10)
  }
]

const samplePosts = [
  {
    postContent: "Just Reached Level 100 on my Demon Hunter!!!",
    postImage: "",
    post_user_id: 1
  },
  {
    postContent: "Anyone want to run some raids??",
    postImage: "",
    post_user_id: 1
  },
  {
    postContent: "Apex anyone?",
    postImage: "",
    post_user_id: 2
  },
  {
    postContent: "Just Reached hit Diamond in LoL!",
    postImage: "",
    post_user_id: 3
  },
  {
    postContent: "Whats everyone's favourite weapon to use in Warzone now?",
    postImage: "",
    post_user_id: 2
  },
  {
    postContent: "Looking for a healer for raids!",
    postImage: "",
    post_user_id: 1
  }
]

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(sampleUsers);
    })
    .then(() => {
      return knex('posts').del();
    })
    .then(() => {
      return knex('posts').insert(samplePosts);
    })
}
