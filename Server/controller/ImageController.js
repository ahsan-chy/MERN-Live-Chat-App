require('dotenv').config();
const { default: mongoose } = require('mongoose')
const cloudinary = require('cloudinary').v2;
const ImageModel = require('../models/ImageModel');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

let imagesUpload = async(req, res, next) => {

  const result =await cloudinary.uploader.upload(req.file.path);

  // console.log("result", result)

  try {   
    const image = new ImageModel({
      // avater: req.body.avater,
      url: result.secure_url
    });
    
    await image.save();
    // console.log("image", image)

    res.status(200).json({ message: 'File uploaded successfully', image: image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { imagesUpload };
