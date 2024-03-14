import React, { useEffect, useState } from 'react';
import Post from "../components/Post";
import Spinner from "../components/common/Spinner";
import { getBookmarkPosts } from "../services/postService.js";



const Bookmarks = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getBookmarkPosts()
            .then(({ data }) => {
                setPosts(data.data);
            })
            .catch((err) => {
                console.log("ERROR: ", err)
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='w-full'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    posts.length > 0 ? (
                        posts.map((post) => (
                            <Post key={post?._id} setIsLoading={setLoading} post={post} />
                        ))
                    ) : (
                        <div className='w-full mt-10'>
                            <p className='text-white text-center text-4xl font-bold'>No bookmark found</p>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Bookmarks