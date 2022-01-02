import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    
    // const [name, setName] = useState("-");
    // const [room, setRoom] = useState("-");
    const Name = window.localStorage.getItem("name")
    const Room = window.localStorage.getItem("room")
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    console.log(Name,Room);
    const ENDPOINT = 'localhost:3001';
    
    useEffect(()=>{
        // ; //used to get name and room from the URL
        // setName(window.localStorage.getItem("name"));
        // setRoom(window.localStorage.getItem("room"));
        
        socket = io(ENDPOINT)
        console.log(Name)
        console.log(Room)
        socket.emit('join',({Name, Room}));
        return () =>{ // will be used to disconnect when the client leaves the chat
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT])

    // useEffect(()=>{
    //     // ; //used to get name and room from the URL
    //     // setName(window.localStorage.getItem("name"));
    //     // setRoom(window.localStorage.getItem("room"));
    //     // console.log("nameRoom",name.current,room.current);
    // }, [window.localStorage.getItem("name"),room])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])
    
    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit('sendMessage', message, () => setMessage(""))
    }

    // console.log(message, messages);
    return (
        <div>
            Chat
            <div>
                <span>{`Hiii ${Name}!!! Welcome to Room ${Room}`}<br/></span>
                <input 
                type="text" 
                value={message} 
                onChange={(event) => {setMessage(event.target.value)}}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) :null }
                />
            </div>
        </div>
    )
}

export default Chat
