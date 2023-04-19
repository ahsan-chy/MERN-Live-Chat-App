const { default: mongoose } = require('mongoose')
const ImageModel = require('../models/ImageModel');
const multer = require('multer');

var filestorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null,'./uploads')
  },
  filename:(req,file, cb) => {
      cb(null,Date.now() + '-' + file.originalname)
  }
})

var upload = multer({
  storage:filestorageEngine
}).single('avater');

// Controller function for handling file uploads
const imagesUpload = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      return res.status(500).json({ message: err.message });
    } else if (err) {
      // Other error occurred
      return res.status(500).json({ message: err.message });
    }

    // No errors occurred, create a new document in ImageModel collection
    const image = new ImageModel({
      avater: Date.now() + '-' + req.file.originalname,
      path: req.file.path
    });

    image.save((err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.status(200).json({ message: 'File uploaded successfully' });
    });
  });
};

module.exports = { imagesUpload };