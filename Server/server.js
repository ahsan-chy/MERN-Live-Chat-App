// Sparkle - Chat App
require('dotenv').config();
const connectDB = require('./db/connection');
const app = require("express")();
const mongoose = require('mongoose');
const server = require("http").createServer(app);
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const userRoutes = require("./routes/route")
const cookieParser = require('cookie-parser');
const multer = require('multer');

const io = require("socket.io")(server,{
    cors:{
        origin: "*",
        // method: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
    }
})
 
//Middleware
// app.use(morgan('tiny'))
// app.use(fileUpload());

app.use(cors({
    origin: "http://localhost:3000",    //Step 2: Specify origin
    credentials: true,  //Step 3: Credintials True (It will work to make both parties available to exchange data)
    
}))  
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


// const io = new Server(server, {
//     cors:{
//         origin: "http://localhost:3000",
//         methods: ["GET", 'POST'],
//     },
// });


// --- Connect with DB
connectDB().then(()=> {
    server.listen(process.env.PORT, () => {
        console.log(`ServerStarted at port `,process.env.PORT)
}) }) 

app.use('/api/user', userRoutes)

// -- Image Upload Api --// 

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
})

app.post('/file', upload.array("file", 3),(req, res) => {
  if(req.files){
    // console.log("Req. File",req.file)
     res.send("file uploaded successfully")
  }
  else
  res.send("No File Uploaded")
})











// ----Socket io ----- //
io.on("connection", (socket)=>{
    // console.log("socket", socket,"\n","Socket Id", socket.id);

    socket.on("chat", (payload) => {
    //   console.log("User Disconnected", payload);
      io.emit("chat", payload) 
    });
})



