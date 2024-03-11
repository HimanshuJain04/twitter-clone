import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetailsByUsername } from "../services/userService.js"
import { PiVideoCameraFill } from "react-icons/pi";
import { MdAddCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux"
import io from 'socket.io-client';




const IO_URL = import.meta.env.VITE_SERVER_IO_URL;


const Chat = () => {

    const socket = io(IO_URL);

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const textAreaRef = useRef();
    const [message, setMessage] = useState("")
    const userState = useSelector(state => state.auth.user);
    const [receivedMessages, setReceivedMessages] = useState([]);


    // for auto growing textarea
    useEffect(() => {
        if (textAreaRef.current) {

            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = "0px";
            let scrollHeight = textAreaRef.current.scrollHeight;

            // Check if scrollHeight exceeds the maximum height
            if (scrollHeight > 150) {
                textAreaRef.current.style.height = "150px"; // Set height to maximum
                textAreaRef.current.style.overflowY = "scroll"; // Enable vertical scrollbar
            } else {
                // Set the height of the textarea to match its content
                textAreaRef.current.style.height = scrollHeight + "px";
                textAreaRef.current.style.overflowY = "hidden"; // Hide vertical scrollbar
            }

        }
    }, [textAreaRef.current, message]);


    useEffect(() => {
        socket.emit('userConnected', userState._id);
    }, []);


    useEffect(() => {
        const name = pathname.split("/").at(-1);

        getUserDetailsByUsername(name)
            .then(({ data }) => {
                setUserData(data.data.existedUser);
            }).catch((err) => {
                console.log("ERROR: ", err);
            })

    }, [pathname]);


    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('send-message-one-to-one', message, userState._id, userData._id);
            setMessage("");
        }
    };


    useEffect(() => {
        // Define the event listener function
        const handleMessageReceived = (data) => {
            setReceivedMessages(prevMessages => [...prevMessages, data]);
        };

        // Add the event listener
        socket.on('receive-message', handleMessageReceived);

        return () => {
            socket.off('receive-message');
        };

    }, [socket]);



    return (
        <div>
            <div className='w-full h-screen relative overflow-hidden'>

                {/* navbar */}
                <div className='w-full sticky top-0 pl-5 pr-2 py-1 border-b-2 border-white/[0.2] flex justify-between items-center bg-black'>

                    {/* for user details */}
                    <div className='flex gap-5'>
                        {/* profile image */}
                        <div className='h-14 w-14 overflow-hidden'>
                            <img
                                className='h-full w-full object-contain rounded-full'
                                src={userData?.profileImg}
                                alt={userData?.fullName}
                            />
                        </div>

                        {/* name */}
                        <div className='flex flex-col justify-center font-semibold items-start'>
                            <p className='text-white'>{userData?.fullName}</p>
                            <p onClick={() => navigate(`/profile/${userData?.userName}`)} className='text-white/[0.5] cursor-pointer hover:underline'>{userData?.userName}</p>
                        </div>
                    </div>

                    {/* for features */}
                    <div className='flex justify-center items-center gap-6'>
                        {/* calling features */}
                        <div className='flex gap-4 justify-center text-2xl items-center text-white/[0.9]'>

                            <abbr
                                className='cursor-pointer rounded-full transition-all duration-200 ease-in-out  p-2 hover:bg-white/[0.15]'

                                title="Video call">
                                <span >
                                    <PiVideoCameraFill />
                                </span>
                            </abbr>

                            <abbr
                                className='cursor-pointer rounded-full transition-all duration-200 ease-in-out  p-2 hover:bg-white/[0.15]'
                                title="Voice call"
                            >
                                <span >
                                    <MdAddCall />
                                </span>
                            </abbr>
                        </div>

                        {/* other options */}
                        <abbr
                            className='cursor-pointer text-xl transition-all duration-200 ease-in-out rounded-full p-2 hover:bg-white/[0.15] text-white/[0.9]'
                            title='More options'>
                            <HiDotsVertical />
                        </abbr>
                    </div>

                </div>

                <div className='w-full h-screen p-5 overflow-auto text-white'>
                    {receivedMessages}
                </div>

                {/* footer */}
                <div className=' px-5 z-[100] bg-black w-full border-t-2 border-white/[0.2] sticky bottom-0 pt-3 pb-5 gap-5 flex justify-between items-start'>

                    <div className='w-full'>
                        <textarea
                            type="text"
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            ref={textAreaRef}
                            className='w-full  rounded-md bg-white/[0.2] text-white placeholder:text-white/[0.25] resize-none px-3 py-1 text-lg font-semibold outline-none'
                            placeholder='Send messages'
                        />
                    </div>

                    <div>
                        <button onClick={sendMessage} className='flex bg-blue-500 text-white font-semibold rounded-full px-5 py-1 transition-all duration-200 ease-in-out gap-2 justify-center hover:shadow-sm hover:shadow-white items-center text-lg'>
                            <span>Send</span>
                            <span>
                                <MdSend />
                            </span>
                        </button>
                    </div>

                </div>

            </div>
        </div >
    );
}

export default Chat