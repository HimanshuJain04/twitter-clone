import React from 'react'
import Post from "../components/Post";

const ReplyPost = ({ setIsLoading, post }) => {
    console.log("post: ", post)

    const commentPost = post.comment;
    const parentPost = post.parentPost;

    if (!commentPost || !parentPost) {
        return <></>
    }

    return (
        <div className='w-full bg-white/[0.09]'>
            <Post setIsLoading={setIsLoading} isdetailedPage={false} post={parentPost} />
            <Post setIsLoading={setIsLoading} isdetailedPage={false} post={commentPost} />
        </div>
    )
}

export default ReplyPost