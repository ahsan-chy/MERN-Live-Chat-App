const { default: mongoose } = require('mongoose')
const Image = require('../models/ImageModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

const imagesUpload = async (req, res, next) => {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    //   }

    //   const image = req.files.image;                         //+ Request for image
    //   console.log(image)
    upload.single('image'), (req, res) => {
        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
      
        res.send('File uploaded!');
      }
}


module.exports = {    imagesUpload}