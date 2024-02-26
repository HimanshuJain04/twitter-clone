import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom"
import { getProfileTime } from "../utils/getTime.js";
import { IoLocationOutline } from "react-icons/io5";
import { ImCalendar } from "react-icons/im";
import toast from "react-hot-toast";
import PostSkeleton from '../components/common/PostSkeleton.jsx';
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/Post.jsx";
import { FaLink } from "react-icons/fa6";
import { AiOutlineCamera } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Spinner from "../components/common/Spinner.jsx"
import { IoIosSave } from "react-icons/io";
import {
    getUserPosts,
    getUserReplies,
    getUserMediaPosts,
    getUserHighlights,
    getUserLikePosts
} from "../services/postService.js";

import {
    getUserDetailsByUsername,
    userFollowHandler,
    updateUserCoverImage,
} from "../services/userService.js";


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
import { useSelector } from "react-redux";


const Profile = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const coverRef = useRef(null);
    const username = pathname.split("/").at(-1);
    const userState = useSelector(state => state.auth.user);

    const [option, setOption] = useState(profileSection[0]);
    const [postData, setPostData] = useState([]);
    const [user, setUser] = useState(null);
    const [postLen, setPostLen] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageloading, setPageLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(0);
    const [coverImg, setCoverImg] = useState();


    useEffect(() => {
        setIndex(0);
        setPostData([]);
        fetchMoreData(0);
    }, [option])


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
                func = getUserMediaPosts;
                break;

            case "Likes":
                func = getUserLikePosts;
                break;

            default:
                func = getUserPosts;
                break;
        }

        func(username, currentIndex)
            .then(({ data }) => {
                setPostData((prevItems) => [...prevItems, ...data.data]);
                setIndex(currentIndex + 1);
                data?.data?.length === 10 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    const followHandler = async () => {

        setLoading(true);

        await userFollowHandler(user._id)
            .then(({ data }) => {
                toast.success(
                    data.isFollow ? "Follow" : "Unfollow"
                );

                setUser(data.data.updatedUser);

            }).catch((err) => {
                toast.error("Something went wrong");
                console.log("ERROR: ", err);
            })
            .finally(() => setLoading(false))
    }


    async function coverImgUpdateHandler() {

        setPageLoading(true);

        const fd = new FormData();

        fd.append("post", coverImg, coverImg?.name);

        await updateUserCoverImage(fd)
            .then(({ data }) => {
                setUser(data.data);
                setCoverImg(data.data.additionalDetails.coverImg);
                toast.success("Cover image updated");
            })
            .catch((err) => {
                toast.error("Cover image update failed")
                console.log("Error: ", err)
            })
            .finally(() => setPageLoading(false))
    }


    useEffect(() => {

        setPageLoading(true);
        getUserDetailsByUsername(username)
            .then(({ data }) => {
                setUser(data.data.existedUser);
                setPostLen(data.data.postLength)
                setCoverImg(data.data.existedUser?.additionalDetails?.coverImg)
            })
            .catch((err) => {
                setUser(null);
                console.log("Error: ", err)
            })
            .finally(() => setPageLoading(false));

    }, [pathname]);

    console.log(user)



    return (
        <div className='w-full'>
            {
                pageloading ? <Spinner /> : (
                    <div className='w-full justify-start items-start flex flex-col bg-black h-screen overflow-auto'>

                        {/* Navbar */}
                        <div className='flex z-10 sticky top-0 flex-row p-2 gap-5 backdrop-blur-lg justify-start w-full items-center'>

                            {/* navigation */}
                            <span
                                onClick={() => navigate("/home")}
                                className='text-white text-2xl cursor-pointer px-2 py-1 rounded-full hover:bg-[white]/[0.1]'
                            >
                                <MdOutlineKeyboardBackspace />
                            </span>

                            {/* user info */}
                            <div className='flex flex-col justify-start items-start'>
                                <p className='text-white font-bold text-lg'>{user?.fullName}</p>
                                <p className='text-white/[0.4] text-sm font-semibold'>{postLen} posts</p>
                            </div>
                        </div>

                        {/* cover | profile image */}
                        <div className='w-full flex flex-col gap-3 relative'>

                            {/* cover */}
                            <div className=' relative group overflow-hidden bg-white/[0.5] h-[200px] w-full'>
                                {
                                    coverImg &&
                                    <img
                                        src={
                                            (typeof coverImg === 'string' || coverImg instanceof String)
                                                ? coverImg : URL.createObjectURL(coverImg)
                                        }
                                        className='w-full h-auto object-cover'
                                        alt="cover-Img"
                                    />
                                }

                                {
                                    userState?._id === user?._id &&
                                    <>
                                        <input onChange={(e) => setCoverImg(e.target.files[0])} ref={coverRef} type="file" hidden />

                                        <div onClick={() => coverRef.current.click()} className="w-full opacity-0 cursor-pointer h-full bg-black -bottom-[100px] flex text-center justify-center items-center text-5xl transition-all duration-700 ease-in-out text-white  group-hover:bottom-0 group-hover:opacity-60 object-cover absolute z-0  ">
                                            <AiOutlineCamera />
                                        </div>

                                        {/* button */}
                                        {
                                            coverImg !== user?.additionalDetails?.coverImg &&

                                            <div className='absolute flex justify-center items-center gap-4 top-3 right-5  transition-all duration-300 text-2xl ease-in-out font-bold px-5 py-2 rounded-lg  text-white z-10'>

                                                <span onClick={() => { setCoverImg(user.additionalDetails.coverImg) }} className=' bg-black/[0.5]  rounded-full p-3  transition-all duration-300 ease-in-out cursor-pointer hover:bg-black/[0.2] '>
                                                    <MdDelete />
                                                </span>
                                                <span onClick={coverImgUpdateHandler} className=' bg-black/[0.5]  rounded-full p-3  transition-all duration-300 ease-in-out cursor-pointer hover:bg-black/[0.2] '>
                                                    <IoIosSave />
                                                </span>
                                            </div>
                                        }

                                    </>
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

                            {
                                userState?._id === user?._id ?
                                    (
                                        //  edit button
                                        <div onClick={() => navigate(`/edit-profile/${user.userName}`)}
                                            className='w-full flex justify-end px-5'
                                        >
                                            <button
                                                className='font-bold  text-[white] text-sm hover:bg-[white]/[0.12] transition-all duration-300 ease-in-out rounded-full px-10 py-2 border-[1px] border-[white]/[0.7]'
                                            >
                                                Edit profile
                                            </button>
                                        </div>
                                    )

                                    : (
                                        // follow button
                                        <>
                                            <div className='w-full flex justify-end px-5'>
                                                <button
                                                    onClick={followHandler}
                                                    className={`text-white transition-all duration-200 ease-in-out border-[1px] font-bold  py-2 px-10 rounded-full  ` + (
                                                        user?.followers?.includes(userState._id) ? "bg-black border-white/[0.7] hover:bg-[white]/[0.1]" : " bg-blue-400 border-blue-400 hover:bg-blue-300"
                                                    )}
                                                >
                                                    {
                                                        user?.followers?.includes(userState._id) ? "Following" : (
                                                            user?.following?.includes(userState._id) ? "Follow back" : "Follow"
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        </>
                                    )
                            }


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
                                    user?.additionalDetails?.city &&
                                    <span className='flex gap-2 justify-center items-center'>
                                        <IoLocationOutline className='text-xl' />
                                        <p>{user?.additionalDetails?.city}</p>
                                    </span>
                                }

                                <span className='flex gap-2 justify-center items-center'>
                                    <ImCalendar />
                                    <p>Joined {getProfileTime(user?.createdAt)}</p>
                                </span>
                            </div>

                            {
                                user?.additionalDetails?.link &&
                                <div className='text-[15px] font-light text-[white]/[0.5]'>
                                    <span className='flex gap-2 justify-center items-center'>
                                        <FaLink className='text-xl' />
                                        <a
                                            target='_blank'
                                            href={user?.additionalDetails?.link}
                                            className='hover:underline text-blue-400'
                                        >
                                            {user?.additionalDetails?.link}
                                        </a>
                                    </span>

                                </div>
                            }

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

                        <div className='w-full mt-7 mb-2 text-white'>
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
                )
            }

        </div >
    )
}

export default Profile;