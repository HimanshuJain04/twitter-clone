import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { getPostTime } from "../utils/getTime.js"
import { useSelector } from "react-redux"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import toast from "react-hot-toast"
import { RxCross1 } from "react-icons/rx";
import CreateComment from './CreateComment.jsx';
import { useNavigate } from "react-router-dom";
import { viewsConvertor } from "../utils/viewsConvertor.js"
import {
    bookmarkPost,
    likePost,
    increaseViewsOnPost
} from "../services/postService.js";




const Post = ({ post, isdetailedPage, isFeeds }) => {

    const userState = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [isLiked, setisLiked] = useState(post?.likes?.some(like => like.user === userState?._id));
    const [isBookmarked, setIsBookmarked] = useState(post?.bookmarks?.some(bookmark => bookmark.user === userState?._id));
    const [openFile, setOpenFile] = useState(null);
    const [likedCount, setLikedCount] = useState(post?.likes?.length);
    const [bookmarkCount, setBookmarkCount] = useState(post?.bookmarks?.length);

    const [commentBoxOpen, setCommentBoxOpen] = useState(false);


    function commentHandler() {
        setCommentBoxOpen(true);
    }

    function retweetHandler() {

    }


    async function likeHandler() {

        await likePost(post._id)
            .then((res) => {
                setisLiked(res.data.isLiked);

                toast.success(
                    res.data.isLiked ? "Liked" : "Unliked"
                )

                res.data.isLiked ? setLikedCount(likedCount + 1) : setLikedCount(likedCount - 1);

            })
            .catch((err) => {
                console.log("Error when trying to like: ", err)
            })

    }

    async function bookmarkHandler() {

        await bookmarkPost(post._id)
            .then((res) => {
                setIsBookmarked(res.data.isBookmarked);
                toast.success(
                    res.data.isBookmarked ? "Bookmarked" : "Unbookmarked"
                )
                res.data.isBookmarked ? setBookmarkCount(bookmarkCount + 1) : setBookmarkCount(bookmarkCount - 1);

            })
            .catch((err) => {
                console.log("Error when trying to bookmark: ", err)
            })
    }

    useEffect(() => {
        if (isFeeds) {
            increaseViewsOnPost(post?._id)
                .catch((err) => {
                    console.log("ERROR: ", err);
                    toast.error("Something went wrong");
                });
        }
    }, []);


    return (
        <div className='w-full relative'>
            {
                commentBoxOpen &&
                <CreateComment setCommentBoxOpen={setCommentBoxOpen} post={post} />
            }

            {
                openFile &&
                <div className='fixed flex justify-center items-center top-0 left-0 p-10 z-[20] w-full h-screen backdrop-blur-sm '>

                    <span
                        onClick={() => setOpenFile(null)}
                        className='text-4xl cursor-pointer absolute top-5 right-10 text-white'
                    >
                        <RxCross1 />
                    </span>

                    <img
                        src={openFile}
                        className='max-h-full max-w-full object-contain'
                        alt='image'
                    />

                </div>
            }
            <div className='flex cursor-pointer  pb-5 flex-row py-3 px-5 gap-5 border-b-2 border-[white]/[0.2] justify-between items-start w-full'>
                {/* for user image */}
                <div onClick={() => navigate(`/post/${post._id}`)} className='w-[60px]'>
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

                            <span onClick={() => navigate(`/profile/${post?.user?.userName}`)} className='text-white font-bold hover:underline cursor-pointer'>{post?.user?.fullName}</span>

                            <span className='text-[white]/[0.5] font-light cursor-pointer'>@{post?.user?.userName}</span>

                            <div className='bg-[white]/[0.5] rounded-full h-[3px] w-[3px]'></div>

                            <span className='text-[white]/[0.5] font-light cursor-pointer'>
                                {getPostTime(post?.createdAt)}</span>

                        </div>

                        <div className='text-xl cursor-pointer text-white'>
                            <HiDotsHorizontal />
                        </div>
                    </div>

                    {
                        post?.description &&
                            // {/* post descritpion */ }

                            isdetailedPage ? (
                            <div className='text-white text-lg '>
                                {post?.description}
                            </div>
                        ) : (
                            <div className='text-white text-lg '>
                                {`${post?.description?.substring(0, 100)}${post?.description?.length > 100 ? "..." : ""}`}
                            </div>
                        )
                    }

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
                                        className='cursor-pointer'
                                    >
                                        {
                                            (url.includes("mp4") || url.includes("video")) ? (
                                                <video
                                                    src={url}
                                                    controls
                                                    alt="Video"
                                                    loading="lazy"
                                                    className='w-full object-cover'
                                                />
                                            ) : (
                                                <img
                                                    onClick={() => { setOpenFile(url) }}
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
                            >
                                <div className=' text-[white]/[0.3] flex justify-center items-center gap-1 '>
                                    <span
                                        onClick={commentHandler}
                                        className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                    >
                                        <FaRegComment />
                                    </span>
                                    {
                                        post?.comments?.length > 0 &&
                                        <span className='text-white/[0.5] text-sm' >{post?.comments?.length}</span>
                                    }
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
                            >
                                <div
                                    className=' text-[white]/[0.3] flex justify-center items-center gap-1 '
                                >
                                    <span onClick={likeHandler} className='cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'>
                                        {
                                            isLiked ? <FaHeart className='text-red-900' /> : <FaRegHeart />
                                        }
                                    </span>
                                    {
                                        likedCount > 0 &&
                                        <span className='text-white/[0.5] text-sm' >{likedCount}</span>
                                    }
                                </div>
                            </abbr>

                            {/* Stats */}
                            <abbr
                                title="Stats"
                            >
                                <div className=' text-[white]/[0.3] flex justify-center items-center gap-1 '
                                >
                                    <span
                                        className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                    >
                                        <IoStatsChartSharp />
                                    </span>
                                    {
                                        post?.views > 0 &&
                                        <span className='text-white/[0.5] text-sm' >{viewsConvertor(post.views)}</span>
                                    }

                                </div>
                            </abbr>

                            {/* Bookmark */}
                            <abbr
                                title="Bookmark"
                            >
                                <div className=' text-[white]/[0.3] flex justify-center items-center gap-1 '>
                                    <span
                                        onClick={bookmarkHandler}
                                        className=' text-[white]/[0.3] cursor-pointer hover:text-blue-400 transition-all text-lg duration-300 ease-in-out'
                                    >
                                        {
                                            isBookmarked ? <FaBookmark /> : <FaRegBookmark />
                                        }
                                    </span>
                                    {
                                        isdetailedPage &&
                                        bookmarkCount > 0 &&
                                        <span className='text-white/[0.5] text-sm' >{bookmarkCount}</span>
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

            </div >
        </div >
    )
}
export default Post;