const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const userController = require("../controllers/userController");

router.route("/register")
    .post(userController.createUser)

router.route('/login')
    .post(userController.verifyUser)

router.route('/current')
    .get(authorize, userController.getCurrentUser)

router.route('/:userId')
    .get(userController.getUserAvatar)
    .put(userController.updateUser)

router.route('/:userId/dashboard')
    .get(userController.getDashboard)

router.route('/:userId/profile')
    .get(userController.getUserProfile)
    .post(userController.createUserProfile)
    .put(userController.updateUserProfile)



module.exports = router;