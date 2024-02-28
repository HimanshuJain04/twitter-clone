import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import { getPostDetails } from "../services/postService.js"
import Spinner from "../components/common/Spinner.jsx";
import Post from "../components/Post.jsx";


const PostPage = () => {

    const { pathname } = useLocation();
    const postId = pathname.split("/").at(-1);
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        setLoading(true);

        getPostDetails(postId)
            .then(({ data }) => {
                console.log(data)
                setPostData(data.data);
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pathname])


    return (
        <div className='w-full'>
            <div className='w-full justify-start items-start flex flex-col bg-black h-screen overflow-auto'>
                {
                    loading ? <Spinner /> : (
                        <div className='w-full py-5'>

                            {/* post details */}
                            <div>
                                <Post post={postData} isdetailedPage={true} />
                            </div>

                            {/* Comments */}
                            <div className='w-full'>
                                {
                                    postData?.comments?.map((commentPost) => (
                                        <div key={commentPost._id}>
                                            <Post post={commentPost} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )

                }
            </div>

        </div>
    )
}

export default PostPage