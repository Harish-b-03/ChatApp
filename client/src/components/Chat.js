import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    
    const [name, setName] = useState("");
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:3001';
    useEffect(()=>{
        const data = queryString.parse(window.location.search); //used to get name and room from the URL
        console.log(data)
        socket = io(ENDPOINT)

        setName(data.name);
        setRoom(data.room);

        socket.emit('join',{ name, room }, ()=>{
            //activates when the callback() from server-side is called
        });

        return () =>{ // will be used to disconnect when the client leaves the chat
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, window.location.search])

    return (
        <div>
            Chat
        </div>
    )
}

export default Chat
