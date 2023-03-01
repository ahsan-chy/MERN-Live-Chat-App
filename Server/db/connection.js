const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set("strictQuery", true);
const connectDB = async() =>{
  try {
     const conn = await mongoose.connect(process.env.MONG_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
 } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit()
 }
}

module.exports = connectDB