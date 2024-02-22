import React, { useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { getTime } from "../utils/getTime.js"
import { useSelector } from "react-redux"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { bookmarkPost, likePost } from "../services/postService.js";



const Post = ({ post }) => {

    const userState = useSelector(state => state.auth.user);

    const [isLiked, setisLiked] = useState(userState?.liked.includes(post?._id));
    const [isBookmarked, setIsBookmarked] = useState(userState?.bookmarked.includes(post?._id));


    function commentHandler() {
        console.log("Comment")
    }

    function retweetHandler() {

    }


    async function likeHandler() {

        await likePost(post._id)
            .then((res) => {
                setisLiked(res.data.isLiked);
            })
            .catch((err) => {
                console.log("Error when trying to like: ", err)
            })

    }


    function statsHandler() {

    }


    async function bookmarkHandler() {

        await bookmarkPost(post._id)
            .then((res) => {
                setIsBookmarked(res.data.isBookmarked);
            })
            .catch((err) => {
                console.log("Error when trying to bookmark: ", err)
            })
    }



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

                    {/* images |  video */}
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
                                        {
                                            url.includes("mp4") ? (
                                                <video
                                                    src='url'
                                                    controls
                                                    alt="Video"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <img
                                                    src={url}
                                                    loading='lazy'
                                                    alt="Image"
                                                />

                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    }

                    {/* options on post */}
                    <div className='flex w-full mt-2 flex-row items-center gap-8'>

                        <div className='flex w-full items-center justify-between'>

                            {/* Comment */}
                            <abbr
                                title="Comment"
                                onClick={commentHandler}
                            >
                                <div
                                    className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                >
                                    <FaRegComment />
                                </div>
                            </abbr>

                            {/* Retweet */}
                            <abbr
                                title="Retweet"
                                onClick={retweetHandler}
                            >
                                <div
                                    className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                >
                                    <AiOutlineRetweet />
                                </div>
                            </abbr>

                            {/* Like */}
                            <abbr
                                title="Like"
                                onClick={likeHandler}
                            >
                                <div
                                    className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                >
                                    {
                                        isLiked ? <FaHeart /> : <FaRegHeart />
                                    }
                                </div>
                            </abbr>

                            {/* Stats */}
                            <abbr
                                title="Stats"
                                onClick={statsHandler}
                            >
                                <div
                                    className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                >
                                    <IoStatsChartSharp />
                                </div>
                            </abbr>

                            {/* Bookmark */}
                            <abbr
                                title="Bookmark"
                                onClick={bookmarkHandler}
                            >
                                <div
                                    className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                >
                                    {
                                        isBookmarked ? <FaBookmark /> : <FaRegBookmark />
                                    }
                                </div>
                            </abbr>

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

export default Post;