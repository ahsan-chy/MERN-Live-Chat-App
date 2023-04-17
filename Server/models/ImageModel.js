const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    avater:{
        type: String,
    },
}, {timestamps: true})


module.exports = mongoose.model('Images', ImageSchema)