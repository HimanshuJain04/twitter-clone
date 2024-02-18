import React from 'react'
import { CiImageOn } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";

const CreatePost = () => {

    const state = useSelector(state => state.auth);


    return (
        <div className='w-full'>
            <div className='w-ful py-3  gap-2 flex justify-start items-start px-5 border-b-2 border-[white]/[0.2]'>

                {/* user-image */}
                <div className='overflow-hidden rounded-full h-[60px] w-[60px]'>
                    <img
                        src={state?.user?.profileImg}
                        alt="profile-Image"
                        className='h-14 w-14 object-contain p-1 rounded-full'
                    />
                </div>

                {/* other content */}
                <div className='flex flex-col mt-2 justify-start items-start w-full'>
                    {/* input field and image */}
                    <div className='w-full '>
                        <textarea
                            className='w-full h-[100px] bg-transparent text-white resize-none outline-none text-xl'
                            placeholder='What is happening?!'
                        />
                    </div>

                    {/* other options for image/etc and post */}
                    <div className='flex w-full justify-between items-center'>

                        {/* other option */}
                        <div className='flex justify-center items-center gap-5'>
                            <div className='text-xl cursor-pointer text-blue-400'>
                                <CiImageOn />
                            </div>
                            <abbr title="emoji" className='text-white '>
                                <div className='text-xl cursor-pointer text-blue-400'>
                                    <MdOutlineEmojiEmotions />
                                </div>
                            </abbr>
                        </div>

                        {/* post button */}
                        <div>
                            <button
                                className='bg-blue-400 text-white py-2 px-10 font-bold rounded-full'
                            >Post</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CreatePost