import React from 'react'
import Post from "../components/Post";

const ReplyPost = ({ parentPost, setIsLoading, commentPost }) => {
    return (
        <div className='w-full bg-white/[0.09]'>
            <Post setIsLoading={setIsLoading} post={parentPost} />
            <Post setIsLoading={setIsLoading} post={commentPost} />
        </div>
    )
}

export default ReplyPost