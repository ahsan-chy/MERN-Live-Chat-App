require('dotenv').config();
const { default: mongoose } = require('mongoose')
const ImageModel = require('../models/ImageModel');
const multer = require('multer');
const upload = require("../middlewares/multer.js")


let imagesUpload = async(req, res, next) => {

  
  upload(req, res, function (err) {

  const image = new ImageModel({
        avater: Date.now() + '-' + req.file.originalname,
        url: req.file.path
      });
      image.save();

  res.status(200).json({ message: 'File uploaded successfully' });
    })

};



module.exports = { imagesUpload };
