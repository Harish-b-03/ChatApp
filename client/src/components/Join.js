import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Join = () =>  {
    
    const [name, setName] = useState("");
    const [room, setRoom] = useState('');

    return (
        <div className='joinOuterClass'>
            <div className='joinInnerClass'>
                <h1 className='Heading'> JOIN </h1>
                <div><input placeholder='Name' className='joinNameInput' onChange={(event)=>{setName(event.target.value);{/*console.log(name)*/}}}/></div>
                <div><input placeholder='Room' className='joinRoomInput' onChange={(event)=>{setRoom(event.target.value);{/*console.log(room)*/}}}/></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='joinButton button' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
