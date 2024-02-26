import React from 'react'

const CreateComment = ({ userId, postId }) => {
    return (
        <div className='fixed top-0 bg-black/[0.5] flex justify-center items-center left-0 z-30 text-white w-screen h-screen'>
            <div className=''>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
        </div>
    )
}

export default CreateComment