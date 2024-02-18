import React, { useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import Post from '../../components/Post';
import CreatePost from '../CreatePost';

const Feeds = () => {

    const navLinks = [
        "For you",
        "Following",
    ];


    const [option, setOption] = useState(navLinks[0]);

    const feeds = [
        {
            _id: 1,
            description: "hellloooo",
            fullName: "himanshu",
            userName: "himanshu_09",
        },
        {
            _id: 3,
            description: "hellloooo",
            fullName: "himanshu",
            userName: "himanshu_09",
        },
        {
            _id: 5,
            description: "hellloooo",
            fullName: "himanshu",
            userName: "himanshu_09",
        },
    ]


    return (
        <div className='w-full'>
            <div className='flex flex-col  justify-start items-center bg-black'>

                {/* navbar */}
                <div className='flex flex-row justify-between backdrop-blur-2xl w-full border-b-2 border-[white]/[0.19]'>
                    {
                        navLinks?.map((navlink, index) => (
                            <div
                                key={index}
                                className='flex w-full hover:bg-[white]/[0.1] pt-3 transition-all duration-200 ease-in-out  cursor-pointer justify-center items-center flex-row gap-2'
                                onClick={() => {
                                    setOption(navlink)
                                }}
                            >
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className={` transition-all duration-300 ease-in-out ${option === navlink ? "text-white font-bold" : "text-[white]/[0.4] font-semibold"} `}>{navlink}</p>
                                    <span className={`bg-blue-400 transition-all duration-200 ease-in-out w-full h-1 rounded-full ${option === navlink ? "block" : "hidden"} `} />
                                </div>
                            </div>
                        ))
                    }


                    <div className='hover:bg-[white]/[0.1] transition-all duration-300 ease-in-out text-xl mx-2 text-white px-3 rounded-full flex justify-center items-center cursor-pointer '>
                        <IoSettingsOutline />
                    </div>

                </div>

                <CreatePost />

                <div className='w-full'>

                    {
                        feeds?.map((post) => (
                            <Post key={post?._id} post={post} />
                        ))
                    }

                </div>

            </div>
        </div >
    )
}

export default Feeds