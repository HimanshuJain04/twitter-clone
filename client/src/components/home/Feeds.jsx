import React, { useEffect, useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import Post from '../../components/Post';
import CreatePost from '../CreatePost';
import { fetchFeeds, fetchFollowingPosts } from "../../services/postService.js";
import TransparencySpinner from '../common/TransparencySpinner.jsx';
import PostSkeleton from '../common/PostSkeleton.jsx';

const navLinks = [
    "For you",
    "Following",
];

const Feeds = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [allPosts, setAllPosts] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(0);

    const [option, setOption] = useState(navLinks[0]);

    async function fetchMoreData(currIndex) {

        setIsSkeleton(true);

        let func;

        switch (option) {

            case "For you":
                func = fetchFeeds;
                break;

            case "Following":
                func = fetchFollowingPosts;
                break;

            default:
                func = fetchFeeds;
                break;
        }

        func(currIndex)
            .then(({ data }) => {
                setAllPosts((prevItems) => [...prevItems, ...data.data]);
                setIndex(currIndex + 1);
                data?.data?.length === 10 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsSkeleton(false));
    }


    useEffect(() => {
        setIndex(0);
        setAllPosts([]);
        setHasMore(true);
        fetchMoreData(0);
    }, [option]);


    return (
        <div className='w-full'>
            <div className='flex w-full relative flex-col justify-start items-center bg-'>

                {/* Spinner */}
                {
                    isLoading &&
                    <TransparencySpinner />
                }

                {/* navbar */}
                <div className='flex sticky  top-0 flex-row justify-between backdrop-blur-2xl w-full border-b-2 border-[white]/[0.19]'>
                    {
                        navLinks?.map((navlink, index) => (
                            <div
                                key={index}
                                className='flex w-full hover:bg-[white]/[0.1] pt-3 transition-all duration-200 ease-in-out  cursor-pointer justify-center items-center flex-row gap-2'
                                onClick={() => {
                                    setOption(navlink)
                                }}
                            >
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className={` transition-all duration-300 ease-in-out ${option === navlink ? "text-white font-bold" : "text-[white]/[0.4] font-semibold"} `}>{navlink}</p>
                                    <span className={`bg-blue-400 transition-all duration-200 ease-in-out w-full h-1 rounded-full ${option === navlink ? "block" : "hidden"} `} />
                                </div>
                            </div>
                        ))
                    }


                    <div className='hover:bg-[white]/[0.1] transition-all duration-300 ease-in-out text-xl mx-2 text-white px-3 rounded-full flex justify-center items-center cursor-pointer '>
                        <IoSettingsOutline />
                    </div>

                </div>

                {/* Feeds */}
                <div className='h-[calc(100vh-100px)] w-full bg- overflow-y-auto'>
                    {
                        isSkeleton ? (
                            <div className='flex flex-col justify-start gap-5 items-center'>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </div>
                        ) : (
                            <>

                                {
                                    option === "For you" &&
                                    <div>
                                        <CreatePost type={"Post"} setIsLoading={setIsLoading} />
                                    </div>
                                }


                                <div className='w-full  flex mt-5 flex-col gap-5 justify-start items-start'>

                                    {
                                        allPosts.length > 0 ? (
                                            allPosts.map((post) => (
                                                <Post key={post?._id} isFeeds={true} post={post} />
                                            ))
                                        ) : (
                                            <div className='w-full mt-10'>
                                                <p className='text-white text-center text-4xl font-bold'>No post found</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }


                </div>

            </div>
        </div >
    );
}

export default Feeds