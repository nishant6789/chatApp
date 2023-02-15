//TODO : check if websocket port and app port can be run on the same port or not

const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const mongoose = require('mongoose');
require("dotenv").config();

const authroutes = require("./routes/auth")
const messageroutes = require("./routes/messages")

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongodb connected successfully")
}).catch((error) => {
    console.log(error.message)
})

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server started on port ${process.env.PORT}`);
})

app.use("/api/auth", authroutes)
app.use("/api/chat", messageroutes)

const users = {}

io.on('connection', socket=> {
    socket.on('new-user-joined', name => {
        console.log("userJoined", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message : message, name : users[socket.id]});
    })

    socket.on('disconnect', message => {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id]
    })

})

module.exports = app;