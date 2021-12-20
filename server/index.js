const express = require("express");
const http = require('http');
const { callbackify } = require("util");
const router = require('./router.js');
const PORT = process.env.PORT || 3001;

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

    socket.on('join',({ name, room }) => {
        console.log(name, room);
        
        // callback();
    })

    socket.on('disconnect',(s)=>{
        console.log(`we lost a connection`);
    })
})

app.use(router)

server.listen(PORT, ()=>{console.log(`Server is running on the port: ${PORT}`)});