import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { getProfileTime } from "../utils/getTime";
import { IoLocationOutline } from "react-icons/io5";
import { ImCalendar } from "react-icons/im";
import toast from "react-hot-toast";
import PostSkeleton from './common/PostSkeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/Post.jsx";
import { useSelector } from "react-redux"
import {
    getUserPosts,
    getUserReplies,
    getUserMediaPost,
    getUserHighlights,
    getUserLikePosts

} from "../services/postService.js";


const profileSection = [
    {
        title: "Posts",
    },
    {
        title: "Replies",
    },
    {
        title: "Highlights",
    },
    {
        title: "Media",
    },
    {
        title: "Likes",
    }
];


const ProfileTemp = ({ user }) => {

    const navigate = useNavigate();
    console.log(user)

    const [option, setOption] = useState(profileSection[0]);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        setIndex(0);
        setPostData([]);
        fetchMoreData(0);
    }, [option]);


    const fetchMoreData = (currentIndex) => {

        setLoading(true);

        let func;

        switch (option.title) {

            case "Posts":
                func = getUserPosts;
                break;

            case "Replies":
                func = getUserReplies;
                break;

            case "Highlights":
                func = getUserHighlights;
                break;

            case "Media":
                func = getUserMediaPost;
                break;

            case "Likes":
                func = getUserLikePosts;
                break;

            default:
                func = getUserPosts;
                break;
        }

        func(user?._id, currentIndex)
            .then(({ data }) => {
                setPostData((prevItems) => [...prevItems, ...data.data]);
                setIndex(currentIndex + 1);
                data?.data?.length === 10 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };


    return (
        <div className='w-full'>
            <div className='w-full justify-start items-start flex flex-col bg-black h-screen overflow-auto'>

                {/* Navbar */}
                <div className='flex z-10 sticky top-0 flex-row p-2 gap-5 backdrop-blur-lg justify-start w-full items-center'>

                    {/* navigation */}
                    <span
                        onClick={() => navigate(-1)}
                        className='text-white text-2xl cursor-pointer px-2 py-1 rounded-full hover:bg-[white]/[0.1]'
                    >
                        <MdOutlineKeyboardBackspace />
                    </span>

                    {/* user info */}
                    <div className='flex flex-col justify-start items-start'>
                        <p className='text-white font-bold text-lg'>{user?.fullName}</p>
                        <p className='text-white/[0.4] text-sm font-semibold'>{user?.posts?.length} posts</p>
                    </div>
                </div>

                {/* cover | profile image */}
                <div className='w-full flex flex-col gap-3 relative'>
                    {/* cover */}
                    <div className=' overflow-hidden bg-gray-300 h-[200px] w-full'>
                        {
                            user?.additionalDetails?.coverImg &&
                            <img
                                src={user?.additionalDetails?.coverImg}
                                className='w-full h-auto object-cover'
                                alt="cover-Img"
                            />
                        }
                    </div>

                    {/* profile */}
                    <div className='w-[170px] left-8 -bottom-[40px] absolute h-[170px]'>
                        <img
                            src={user?.profileImg}
                            alt="profileImg"
                            className='rounded-full w-full h-full border-[5px] border-black '
                        />
                    </div>

                    {/* edit button */}
                    <div className='w-full flex justify-end px-5'>
                        <button
                            className='font-bold text-[white] text-sm hover:bg-[white]/[0.1] transition-all duration-200 ease-in-out rounded-full px-5 py-2 border-[1px] border-[white]/[0.4]'
                        >
                            Edit profile
                        </button>
                    </div>

                </div>

                {/* details about user */}
                <div className="flex text-white mt-14 w-full gap-3 px-5 justify-start items-start flex-col">

                    {/* full name */}
                    <div className='flex flex-col gap-0'>
                        <p className='font-bold text-[20px]  '>{user?.fullName}</p>
                        <p className='text-[white]/[0.5] font-light'>@{user?.userName}</p>
                    </div>

                    {/* bio */}
                    {
                        user?.additionalDetails?.bio &&
                        <div>
                            <p className='text-lg'>{user?.additionalDetails?.bio}</p>
                        </div>
                    }

                    {/* location and joinedAt */}
                    <div className='flex gap-3 text-[15px] font-light text-[white]/[0.5]'>
                        {
                            user?.additionalDetails?.location &&
                            <span className='flex gap-2 justify-center items-center'>
                                <IoLocationOutline className='text-xl' />
                                <p>{user?.additionalDetails?.location}</p>
                            </span>
                        }
                        <span className='flex  gap-2 justify-center items-center'>
                            <ImCalendar />
                            <p>Joined {getProfileTime(user?.createdAt)}</p>
                        </span>
                    </div>

                    {/* Followers | Following  */}
                    <div className='flex justify-center items-center font-light gap-5'>
                        <div className='flex gap-1 text-white justify-center items-center'>
                            <span className='font-semibold'>{user?.following?.length}</span>
                            <p className='text-[white]/[0.5] text-[15px]'>Following</p>
                        </div>

                        <div className='flex gap-1 text-white justify-center items-center'>
                            <span className='font-semibold'>{user?.followers?.length}</span>
                            <p className='text-[white]/[0.5] text-[15px]'>Followers</p>
                        </div>

                    </div>

                </div>

                {/* To show different content, it's kind of navbar*/}
                <div className='flex mt-5 w-full justify-between items-center'>
                    {
                        profileSection.map((set, index) => (
                            <div
                                key={set + index}
                                onClick={() => setOption(set)}
                                className=' transition-all flex flex-col pt-4 duration-300 ease-in-out cursor-pointer hover:bg-[white]/[0.1] gap-2 px-2 w-full justify-between items-center'
                            >
                                <span className={` transition-all px-1 text-[15px] duration-300 ease-in-out ${option.title === set.title ? "text-white font-semibold " : "text-[white]/[0.4]"}`}>{set.title}</span>

                                <span className={` bg-blue-400 transition-all duration-300 ease-in-out h-1 w-full rounded-full ${option.title === set.title ? "opacity-100" : " opacity-0"}`}></span>

                            </div>
                        ))
                    }
                </div>

                <div className='w-full mt-7 text-white'>
                    {
                        loading ? (
                            <div className='flex gap-2 flex-col justify-center items-start'>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </div>
                        ) : (
                            postData.length > 0 ? (
                                <>
                                    <InfiniteScroll
                                        dataLength={postData.length}
                                        next={() => fetchMoreData(index)}
                                        hasMore={hasMore}
                                    >
                                        <div className='container'>
                                            <div className='row'>
                                                {
                                                    postData.map((post) => (
                                                        <Post post={post} key={post?._id} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </InfiniteScroll>
                                </>
                            ) : (
                                <>
                                    No post found
                                </>
                            )
                        )
                    }
                </div>

            </div>
        </div >
    )
}

export default ProfileTemp;