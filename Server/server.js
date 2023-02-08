const express = require('express')
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    }
})


io.on("connection", (socket)=>{
    // console.log("socket", socket,"\n");
    console.log("Socket Id", socket.id)

    // socket.on("chat", (payload) => {
    //   console.log("User Chat", payload);
    //   io.emit("chat", payload)
    // });
    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`user with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        //   console.log("User Chat", data);
        //   io.emit("chat", data)
    })

    socket.on("disconnect", (socket) => {
      console.log("User Disconnect")
    }
    )
})

app.get('/', (req, res, next) => {
    res.send("socket")
  })
server.listen(5000, ()=>{
    console.log("Server is Runing at 5000")
})
