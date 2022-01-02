import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Join from "./components/Join"
import Chat from "./components/Chat"

const App = () => {
    const [name, setName] = useState("-");
    const [room, setRoom] = useState("-");
    return (    
        <Router>
            <Routes>
                <Route path="/" exact element={<Join name={name} setName={setName} room={room} setRoom={setRoom}/>} />
                <Route path="/chat" element={<Chat name={name} />}/> 
            </Routes>
        </Router>
        )
};


export default App


