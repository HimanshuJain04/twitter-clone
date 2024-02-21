import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { postFeatures } from "../constants/PostFeatures";
import { getTime } from "../utils/getTime.js"
import { useSelector } from "react-redux"

const Post = ({ post }) => {

    const userState = useSelector(state => state.auth.user);


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

                        <div className='flex justify-center  items-center gap-2'>

                            <span className='text-white font-bold hover:underline cursor-pointer'>{post?.user?.fullName}</span>

                            <span className='text-[white]/[0.5] font-light cursor-pointer'>@{post?.user?.userName}</span>

                            <div className='bg-[white]/[0.5] rounded-full h-[3px] w-[3px]'></div>

                            <span className='text-[white]/[0.5] font-light cursor-pointer'>
                                {getTime(post?.createdAt)}</span>

                        </div>

                        <div className='text-xl cursor-pointer text-white'>
                            <HiDotsHorizontal />
                        </div>
                    </div>

                    {/* post descritpion */}
                    <div className='text-white text-lg '>
                        {post?.description}
                    </div>

                    {/* images */}
                    {
                        post?.postUrls?.length > 0 &&
                        <div
                            className={`w-full my-4 grid  gap-3 ${post.postUrls?.length === 1 ? "" : "grid-cols-2"}`}
                        >
                            {
                                post.postUrls?.map((url, index) => (
                                    <div
                                        key={url + index}
                                        className=''
                                    >
                                        <img src={url} loading='lazy' alt="user-post" />
                                    </div>
                                ))
                            }
                        </div>
                    }

                    {/* options on post */}
                    <div className='flex w-full mt-2 flex-row items-center gap-8'>

                        <div className='flex w-full items-center justify-between'>
                            {
                                postFeatures?.map((set, index) => (
                                    <abbr
                                        key={index}
                                        title={set.title}
                                        onClick={() => set.func(post?._id)}
                                    >
                                        <div
                                            className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                        >
                                            {set.title === "Like" ? (

                                                post?.likes.includes(userState?._id) ?
                                                    set.icon2 :
                                                    set.icon1

                                            ) : set.title === "Bookmark" ? (
                                                post?.bookmarks.includes(userState?._id) ?
                                                    set.icon2 :
                                                    set.icon1
                                            ) : (
                                                set.icon1
                                            )}
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
        </div >
    )
}

export default Post