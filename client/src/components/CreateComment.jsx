import React, { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiImage } from "react-icons/fi";
import { HiOutlineGif } from "react-icons/hi2";
import { createComment } from "../services/postService.js";
import Spinner from "../components/common/TransparencySpinner.jsx"
import { RxCross1 } from "react-icons/rx";
import CreatePost from "./CreatePost.jsx";
import { getPostTime } from "../utils/getTime.js";



const CreateComment = ({ post, setCommentBoxOpen }) => {

    const [loading, setLoading] = useState(false);


    async function createCommentHandler() {

        setLoading(true);

        const fd = new FormData();

        if (file) {
            fd.append(file, "file", file.name);
        }

        if (description.trim().length > 0) {
            fd.append("description", description);
        }

        fd.append("postId", postId)

        await createComment(fd)
            .then(({ data }) => {
                console.log(data)
                toast.success("Comment created!");
                setCommentBoxOpen(false)
            })
            .catch((err) => {
                toast.error("Something went wrong")
                console.log("Error: ", err)
            })
            .finally(() => setLoading(false))
    }




    return (
        <div className='fixed top-0 bg-black/[0.35] flex justify-center items-center left-0 z-30 text-white w-screen h-screen'>
            {

                loading ?
                    <Spinner /> :
                    <div className='w-[500px] relative shadow-lg border-[1px] border-white shadow-white/[0.2] bg-black rounded-lg'>

                        {/* cross icon */}
                        <span onClick={() => setCommentBoxOpen(false)} className='text-white text-2xl absolute cursor-pointer top-3
                        right-2 '>
                            <RxCross1 />
                        </span>


                        <div className='flex w-full gap-2 p-5 justify-start items-start'>

                            {/* left part for image and bar  */}
                            <div className='flex flex-col justify-start gap-3 items-center h-full'>
                                {/* user profile image */}
                                <div className='rounded-full h-12 w-12 overflow-hidden'>
                                    <img src={post.user.profileImg} className='h-full w-full rounded-full object-contain' alt="userImage" />
                                </div>
                                <span className=' w-[2px] rounded-full bg-white'> </span>
                            </div>

                            {/* right paart for description and user details */}
                            <div className='flex flex-col h-full gap-2 justify-start items-start'>

                                {/* user info */}
                                <div className='flex items-center justify-center gap-1'>
                                    <span className='text-white font-bold hover:underline cursor-pointer'>{post?.user?.fullName}</span>

                                    <span className='text-[white]/[0.5] font-light cursor-pointer'>@{post?.user?.userName}</span>

                                    <div className='bg-[white]/[0.5] rounded-full h-[3px] w-[3px]'></div>

                                    <span className='text-[white]/[0.5] font-light '>
                                        {getPostTime(post?.createdAt)}</span>
                                </div>

                                {/* post descritpion */}
                                <div className='text-white text-lg '>
                                    {post?.description}
                                </div>

                                {/* replying to  */}
                                <div>
                                    <p className='cursor-pointer text-blue-400 hover:text-blue-500 transition-all duration-300 ease-in-out hover:underline'>replying to @{post.user.userName}</p>
                                </div>
                            </div>

                        </div>

                        {/* createPost */}
                        <div className='w-full '>
                            <CreatePost />
                        </div>

                    </div>
            }

        </div >
    )
}

export default CreateComment