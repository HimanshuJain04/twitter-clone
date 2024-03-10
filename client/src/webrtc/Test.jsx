import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from "react-redux"

const socket = io('http://localhost:4000');



const Test = () => {

    const userState = useSelector(state => state.auth.user);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Emit 'userConnected' event when component mounts (or when user logs in)
        socket.emit('userConnected', userState._id); // Assuming userState contains user information
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chatMessage', message);
            setMessage('');
        }
    };

    return (
        <div className='text-white'>
            <h1>Chat App</h1>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={message}
                    className='text-black'
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Test;
