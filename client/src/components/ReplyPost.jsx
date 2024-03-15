import React from 'react'
import Post from "../components/Post";

const ReplyPost = ({ parentPost, setIsLoading, commentPost }) => {

    console.log("parentPost: ", parentPost)
    console.log("commentPost: ", commentPost)
    return (
        <div className='w-full bg-white/[0.09]'>
            <Post setIsLoading={setIsLoading} isdetailedPage={false} post={parentPost} />
            <Post setIsLoading={setIsLoading} isdetailedPage={false} post={commentPost} />
        </div>
    )
}

export default ReplyPost