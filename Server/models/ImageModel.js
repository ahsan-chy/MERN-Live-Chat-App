
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  avater: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ImageModel', ImageSchema)