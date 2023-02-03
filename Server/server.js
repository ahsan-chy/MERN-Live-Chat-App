const express = require('express');
const http = require("http");
const cors =  require("cors");
const morgan = require('morgan');
const { Server } = require('engine.io');


const app = express()


//Middleware
app.use(morgan('tiny'))
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", 'POST'],
    },
});

io.on("connection", (socket)=>{
    console.log("socket", socket,"\n","Socket Id", socket.id);

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id)
    });
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

server.listen(4000, ()=>{
    console.log("Server is Runing at 4000")
})
