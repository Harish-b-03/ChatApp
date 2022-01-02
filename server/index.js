const express = require("express");
const http = require('http');
const { callbackify } = require("util");
const router = require('./router.js');
const PORT = process.env.PORT || 3001;
const { addUser , deleteUser, getUser, getUsersInRoom } = require('./users.js')

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, { 
    cors: {    
        origin: "*",    
        methods: ["GET", "POST"],    
    }
}
);


io.on('connection',(socket)=>{
    console.log(`we have a connection`);

    socket.on('join',(data) => {
        console.log(`name ${data.Name} room ${data.Room}`)
        const { error , user } = addUser( socket.id, data.Name, data.Room);

        if (error){
            // return callback(error);
            // callback();
        }
        
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{ user:"admin", text:`${user.name} has joined!`});
        socket.join(user.room);
        // callback();
    })

    
    socket.on('sendMessage',(message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{ user: user.name, text: message});

        callback();
    })

    socket.on('disconnect',(s)=>{
        console.log(`we lost a connection`);
    })
})

app.use(router)

server.listen(PORT, ()=>{console.log(`Server is running on the port: ${PORT}`)});