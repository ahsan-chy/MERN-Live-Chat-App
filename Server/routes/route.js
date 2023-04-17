const express = require('express');
const { loginUser, signUp, restPassword, imageUpload } = require('../controller/userController.js');
// const {imagesUpload} = require('../controller/ImageController.js')
//routers
const router = express.Router();

//+ Upload Image
router.post('/upload', imageUpload)
// router.post('/upload-multer-image', upload, imagesUpload)

// - Login Route
router.post('/login', loginUser)

// - SignUp Route
router.post('/signup', signUp )

// - Update Password 
router.patch('/reset-password/:email', restPassword )

module.exports = router