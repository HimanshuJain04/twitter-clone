import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { postFeatures } from "../constants/PostFeatures";



const Post = ({ post }) => {


    return (
        <div className='w-full'>
            <div className='flex flex-row py-3 px-5 gap-5 border-b-2 border-[white]/[0.2] justify-between items-start w-full'>
                {/* for user image */}
                <div className='w-[60px]'>
                    <img
                        src={post?.user?.profileImg}
                        alt="user-image"
                        className='h-12 w-12 rounded-full object-cover'
                    />
                </div>

                {/* 
                other details */}
                <div className='flex w-full flex-col gap-2 items-start justify-start'>

                    {/* name and username and three-dots */}
                    <div className='flex flex-row w-full justify-between items-center'>
                        <div className='flex justify-center items-center gap-2'>
                            <span>{post?.fullName}</span>
                            <span>{post?.userName}</span>
                        </div>
                        <div className='text-xl cursor-pointer text-white'>
                            <HiDotsHorizontal />
                        </div>
                    </div>

                    {/* post descritpion */}
                    <div className='text-white text-lg font-semibold'>
                        {post?.description}
                    </div>

                    {/* options on post */}
                    <div className='flex w-full mt-2 flex-row items-center gap-8'>

                        <div className='flex w-full items-center justify-between'>
                            {
                                postFeatures?.map((set, index) => (
                                    <abbr
                                        key={index}
                                        title={set.title}
                                    >
                                        <div
                                            className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all duration-300 ease-in-out'
                                        >
                                            <span>
                                                {
                                                    set.icon1
                                                }
                                            </span>
                                        </div>
                                    </abbr>
                                ))
                            }
                        </div>

                        <abbr title="Share">
                            <div
                                className=' text-[white]/[0.5] cursor-pointer hover:text-blue-400 transition-all duration-300 ease-in-out'
                            >
                                <FiShare />
                            </div>
                        </abbr>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Post