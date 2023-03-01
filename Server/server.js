// Sparkle - Chat App
require('dotenv').config();
const connectDB = require('./db/connection');
const app = require("express")();
const mongoose = require('mongoose');
const server = require("http").createServer(app);
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require("./routes/route")


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
app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: false }))

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

// ----Socket io ----- //
io.on("connection", (socket)=>{
    // console.log("socket", socket,"\n","Socket Id", socket.id);

    socket.on("chat", (payload) => {
    //   console.log("User Disconnected", payload);
      io.emit("chat", payload) 
    });
})



