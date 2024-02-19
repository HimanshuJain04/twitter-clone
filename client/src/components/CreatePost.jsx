import React, { useState, useEffect, useRef } from 'react'
import { CiImageOn } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import { createPost as createPostApi } from "../services/postService.js"
import toast from "react-hot-toast";


const CreatePost = () => {

    const state = useSelector(state => state.auth);

    const textAreaRef = useRef(null);
    const fileRef = useRef(null);

    const [postData, setPostData] = useState(
        {
            description: "",
            post: []
        }
    );

    // for auto growing textarea
    useEffect(() => {
        if (textAreaRef.current) {
            console.log(textAreaRef);

            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = "0px";
            let scrollHeight = textAreaRef.current.scrollHeight;

            // Check if scrollHeight exceeds the maximum height
            if (scrollHeight > 300) {
                textAreaRef.current.style.height = "300px"; // Set height to maximum
                textAreaRef.current.style.overflowY = "scroll"; // Enable vertical scrollbar
            } else {
                // Set the height of the textarea to match its content
                textAreaRef.current.style.height = scrollHeight + "px";
                textAreaRef.current.style.overflowY = "hidden"; // Hide vertical scrollbar
            }

        }
    }, [textAreaRef.current, postData.description]);


    function fileRefHandler() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function fileChangeHandler(e) {
        const temp = [...postData.post];
        temp.push(e.target.files)
        setPostData(
            {
                ...postData,
                [postData.post]: temp
            }
        )
    }


    const postHandler = async () => {

        console.log("data: ", postData)
        await createPostApi(postData)
            .then((response) => {
                toast.success("Post created!");
                console.log("res: ", response);

            }).catch((error) => {
                console.log("error: ", error);
                toast.error(error.message);
            })
    }



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
                            id='description'
                            name='description'
                            rows={1}
                            value={postData.description}
                            ref={textAreaRef}

                            onChange={(e) => {
                                setPostData(
                                    {
                                        ...postData,
                                        [e.target.name]: e.target.value
                                    }
                                )
                            }}

                            className='w-full  bg-transparent text-white resize-none outline-none text-xl'
                            placeholder='What is happening?!'
                        />
                    </div>

                    {/* other options for image/etc and post */}
                    <div className='flex w-full justify-between items-center'>

                        {/* other option */}
                        <div className='flex justify-center items-center gap-5'>

                            {/* image button */}
                            <div
                                onClick={fileRefHandler}
                                className='text-xl cursor-pointer text-blue-400'
                            >
                                <input
                                    type="file"
                                    hidden ref={fileRef}
                                    multiple
                                    onChange={fileChangeHandler}
                                />
                                <CiImageOn />
                            </div>

                            {/* emoji button */}
                            <abbr title="emoji" className='text-white '>
                                <div className='text-xl cursor-pointer text-blue-400'>
                                    <MdOutlineEmojiEmotions />
                                </div>
                            </abbr>

                        </div>

                        {/* post button */}
                        <div>
                            <button
                                onClick={postHandler}
                                className='bg-blue-400 text-white py-2 px-10 font-bold rounded-full'
                            >Post</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CreatePost;