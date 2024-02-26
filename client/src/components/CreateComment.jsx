import React, { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiImage } from "react-icons/fi";
import { HiOutlineGif } from "react-icons/hi2";
import { createComment } from "../services/postService.js";
import Spinner from "../components/common/TransparencySpinner.jsx"
import { RxCross1 } from "react-icons/rx";



const CreateComment = ({ postId, setCommentBoxOpen }) => {

    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const textAreaRef = useRef(null);
    const fileRef = useRef(null);


    useEffect(() => {
        if (textAreaRef.current) {

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
    }, [textAreaRef.current, description]);


    function fileRefHandler() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

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
                    <div className='w-[500px] relative shadow-lg border-[1px] border-white shadow-white/[0.2] bg-black rounded-lg p-5  pr-10  '>

                        <span onClick={() => setCommentBoxOpen(false)} className='text-white text-2xl absolute cursor-pointer top-3
                        right-2 '>
                            <RxCross1 />
                        </span>

                        <textarea
                            id='description'
                            name='description'
                            rows={1}
                            value={description}
                            ref={textAreaRef}

                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}

                            className='w-full  bg-transparent min-h-[100px] text-white resize-none outline-none text-xl'
                            placeholder='Comment!'
                        />

                        {/* files */}
                        <div className='overflow-hidden'>

                            {
                                file &&
                                <div className=' w-[400px] overflow-hidden relative max-h-[400px]' >
                                    {/* remove button */}
                                    <abbr title="Remove">
                                        <span
                                            onClick={() => setFile(null)}
                                            className='absolute z-10 shadow-md shadow-black transition-all duration-300 ease-in-out text-black cursor-pointer top-3 right-3 rounded-full p-2 text-lg hover:bg-[black]/[0.8] hover:text-[white]/[0.9] bg-[white]/[0.9]'>
                                            <RiDeleteBin5Fill />
                                        </span>
                                    </abbr>

                                    {
                                        file.type.includes("video") ? (
                                            <video
                                                controls
                                                src={URL.createObjectURL(file)}
                                            />
                                        ) : (
                                            <img
                                                className='w-full h-full object-contain'
                                                src={URL.createObjectURL(file)}
                                            />
                                        )
                                    }

                                </div>
                            }

                        </div>

                        {/* options */}
                        <div className='flex justify-between items-center w-full'>

                            {/* other options */}
                            <div className='flex justify-center items-center gap-5'>
                                {/* media button */}
                                <abbr
                                    title='Media'
                                    onClick={fileRefHandler}
                                    className='text-2xl cursor-pointer text-blue-400'
                                >
                                    <input
                                        type="file"
                                        hidden ref={fileRef}
                                        onChange={(e) => {
                                            console.log(e.target.files)
                                            setFile(e.target.files[0])
                                        }}
                                    />
                                    <FiImage />
                                </abbr>

                                {/* Gifs button */}
                                <abbr title="Gifs" className='text-white '>
                                    <div className='text-2xl cursor-pointer text-blue-400'>
                                        <HiOutlineGif />
                                    </div>
                                </abbr>

                            </div>

                            {/* post button */}
                            <div>
                                <button
                                    disabled={description.trim().length === 0 && !file}
                                    onClick={createCommentHandler}
                                    className='bg-blue-400 disabled:opacity-50 text-white py-2 px-10 font-bold rounded-full'
                                >Post
                                </button>
                            </div>

                        </div>


                    </div>
            }

        </div>
    )
}

export default CreateComment