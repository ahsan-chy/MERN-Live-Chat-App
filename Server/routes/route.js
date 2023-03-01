const express = require('express');
const { loginUser, signUp } = require('../controller/userController.js');

//routers
const router = express.Router();

// - Login Route
router.post('/login', loginUser)

// - SignUp Route
router.post('/signup', signUp )

module.exports = router