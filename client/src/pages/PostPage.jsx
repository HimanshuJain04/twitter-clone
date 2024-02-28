import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import { getPostDetails } from "../services/postService.js"


const PostPage = () => {

    const { pathname } = useLocation();
    const postId = pathname.split("/").at(-1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

        getPostDetails(postId)
            .then(({ data }) => {
                console.log(data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pathname])


    return (
        <div>PostPage</div>
    )
}

export default PostPage