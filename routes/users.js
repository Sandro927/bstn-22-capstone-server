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

router.route('/:userId/dashboard')
    .get(userController.getDashboard)

module.exports = router;