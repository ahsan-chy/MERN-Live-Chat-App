const express = require('express');
const { loginUser, signUp, restPassword } = require('../controller/userController.js');
const uploadController = require('../controller/ImageController.js')
//routers
const router = express.Router();

//+ Upload Image
router.post('/upload-multer-image', uploadController.imagesUpload)

// - Login Route
router.post('/login', loginUser)

// - SignUp Route
router.post('/signup', signUp )

// - Update Password 
router.patch('/reset-password/:email', restPassword )

module.exports = router