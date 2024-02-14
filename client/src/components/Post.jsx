import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { postFeatures } from "../constants/PostFeatures";



const Post = ({ post }) => {


    console.log(postFeatures)

    return (
        <div className='w-full'>
            <div className='flex flex-row justify-between items-start w-full'>
                {/* for user image */}
                <div>
                    <img
                        src={post?.profileImg}
                        alt="user-image"
                        className='h-8 w-8 rounded-full object-cover'
                    />
                </div>

                {/* 
                other details */}
                <div className='flex flex-col gap-2 items-start justify-start'>

                    {/* name and username and three-dots */}
                    <div className='flex flex-row w-full justify-between items-center'>
                        <div className='flex justify-center items-center gap-2'>
                            <span>{post?.fullName}</span>
                            <span>{post?.userName}</span>
                        </div>
                        <div className='text-xl text-white'>
                            <HiDotsHorizontal />
                        </div>
                    </div>

                    {/* post descritpion */}
                    <div className='text-white text-lg font-semibold'>
                        {post?.description}
                    </div>

                    {/* options on post */}
                    <div className='flex w-full flex-row items-center gap-2'>
                        <div className='flex w-full items-center justify-between'>
                            {
                                postFeatures?.map((set, index) => (
                                    <div
                                        key={index}
                                        className=' text-[white]/[0.2] cursor-pointer hover:text-blue-400 transition-all duration-300 ease-in-out'
                                    >
                                        <span>
                                            set.icon1
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                        <div
                            className=' text-[white]/[0.2] hover:text-blue-400 transition-all duration-300 ease-in-out'
                        >
                            <FiShare />
                        </div>

                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default Post