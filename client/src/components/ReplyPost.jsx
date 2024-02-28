import React from 'react'
import Post from "../components/Post";

const ReplyPost = ({ parentPost, commentPost }) => {
    console.log("PARENT: ", parentPost)
    console.log("commentPost: ", commentPost)
    return (
        <div className='w-full bg-white/[0.09]'>
            <Post post={parentPost} />
            <Post post={commentPost} />
        </div>
    )
}

export default ReplyPost