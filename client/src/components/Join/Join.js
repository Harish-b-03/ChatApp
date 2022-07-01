import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Join = (props) =>  {
    
    useEffect(() =>{
        window.localStorage.setItem("name",props.name);
    },[props.name]);

    useEffect(() =>{
        window.localStorage.setItem("room",props.room);
    },[props.room]);

    return (
        <div className='joinOuterClass'>
            <div className='joinInnerClass'>
                <h1 className='Heading'> JOIN </h1>
                <div>
                    <input 
                        placeholder='Name' 
                        className='joinNameInput' 
                        onChange={
                            (event)=>{props.setName(event.target.value);}
                        }
                    />
                </div>
                <div>
                    <input 
                        placeholder='Room' 
                        className='joinRoomInput' 
                        onChange={
                            (event)=>{props.setRoom(event.target.value);}
                        }
                    />
                </div>
                
                <Link onClick={event => (!props.name || !props.room) ?  event.preventDefault(): null} to={`/Chat`}>
                    <button className='joinButton button' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
// name={name} setName={setName} room={room} setRoom={setRoom}