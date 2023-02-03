const app = require("express")();

const server = require("http").createServer(app);

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
// app.use(cors())

// const io = new Server(server, {
//     cors:{
//         origin: "http://localhost:3000",
//         methods: ["GET", 'POST'],
//     },
// });

io.on("connection", (socket)=>{
    // console.log("socket", socket,"\n","Socket Id", socket.id);

    socket.on("chat", (payload) => {
    //   console.log("User Disconnected", payload);
      io.emit("chat", payload)
    });
})

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

server.listen(5000, ()=>{
    console.log("Server is Runing at 5000")
})
