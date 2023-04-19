
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  avater: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ImageModel', ImageSchema)