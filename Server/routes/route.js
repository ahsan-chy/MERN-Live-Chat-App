const express = require('express');
const { loginUser, signUp, restPassword } = require('../controller/userController.js');
const uploadController = require('../controller/ImageController.js')
const upload = require("../middlewares/multer.js")
//routers
const router = express.Router();

//+ Upload Image
// router.post('/upload-multer-image', uploadController.imagesUpload)
router.post('/upload-coudnery-image', upload, uploadController.imagesUpload)

// - Login Route
router.post('/login', loginUser)

// - SignUp Route
router.post('/signup', signUp )

// - Update Password 
router.patch('/reset-password/:email', restPassword )

module.exports = router