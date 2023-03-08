const express = require('express');
const { loginUser, signUp, restPassword } = require('../controller/userController.js');

//routers
const router = express.Router();

// - Login Route
router.post('/login', loginUser)

// - SignUp Route
router.post('/signup', signUp )

// - Update Password 
router.patch('/reset-password/:email', restPassword )

module.exports = router