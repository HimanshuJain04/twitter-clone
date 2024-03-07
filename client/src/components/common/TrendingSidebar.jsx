import React, { useState, useRef, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import { BsXCircleFill } from "react-icons/bs";
import { getSearchedValue } from "../../services/userService.js"


const TrendingSidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const searchBarRef = useRef(null);
    const [searchedData, setSearchedData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // Handle click outside the search bar to close the results div
    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Add event listener for clicks outside on component mount, remove on unmount
    useEffect(() => {
        const listener = document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', listener);
    }, []);


    useEffect(() => {

        if (searchValue.trim()) {
            setSearchLoading(true);

            getSearchedValue(searchValue)
                .then(({ data }) => {
                    setSearchedData(data.data)
                })
                .catch((err) => {
                    console.log("ERROR: ", err)
                })
                .finally(() => {
                    setSearchLoading(false);
                })
        }

    }, [searchValue]);


    return (
        <div>
            <div className='flex relative flex-col w-[400px] pl-10 pt-2 min-h-screen border-l-2 border-[white]/[0.15] justify-start items-start gap-5'>


                <div ref={searchBarRef}
                    className='relative w-full'>
                    {/* Search Bar */}
                    <div
                        onClick={() => {
                            if (!isOpen) {
                                setIsOpen(true);
                            }
                        }}
                        className='flex relative w-full justify-center group focus-within:border-blue-500 transition-all duration-200 ease-in-out border-2 border-transparent  items-center gap-2 bg-[#202327] rounded-full px-3'
                    >
                        <span className='text-[white]/[0.2] group-focus-within:text-blue-500 text-lg'>
                            <FiSearch />
                        </span>
                        <input
                            type="text"
                            placeholder='Search'
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            className='bg-transparent outline-none w-full  px-1 py-2  text-white placeholder:text-[white]/[0.3]'
                        />


                        {
                            searchValue &&
                            <span onClick={() => setSearchValue("")} className="text-blue-400 hover:text-blue-500 transition-all duration-200 ease-in-out cursor-pointer text-xl">
                                <BsXCircleFill />
                            </span>
                        }

                    </div>

                    {/* Other Div */}
                    {isOpen && (
                        <div
                            className='bg-black mt-1 shadow-lg rounded-md border-[2px] border-white/[0.2] shadow-white/[0.4] w-full '
                        >
                            {
                                searchValue.length > 0 ? (
                                    <div className='text-white relative w-full'>
                                        <div className=''>
                                            {
                                                searchedData?.map((userData) => (
                                                    <div
                                                        key={userData._id}
                                                    >
                                                        {/* user-image */}
                                                        <div>
                                                            <img src={userData?.profileImg} alt="" />
                                                        </div>

                                                        {/* user name */}
                                                        <div>
                                                            <p>{userData?.fullName}</p>
                                                            <p>{userData?.userName}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-base pb-10 w-full  px-7 pt-5 font-light text-white/[0.5]'>
                                        <p>Try searching for people, lists, or keywords</p>
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>

                {/* subscribe premium */}
                <div className='w-full rounded-xl flex flex-col gap-2 bg-[#16181c] p-3'>
                    <p className='font-bold text-white text-xl'>Subscribe to Premium</p>
                    <p className='text-[white]/[0.9] text-[15px]'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                    <div>
                        <button className='rounded-full bg-blue-400 px-5 py-2 font-semibold text-white'>Subscribe</button>
                    </div>
                </div>

                {/* Live on X */}
                <div className='w-full rounded-xl flex flex-col gap-2 bg-[#16181c] p-3'>
                    <p className='font-bold text-white text-xl'>Live on X</p>
                    <p className='text-[white]/[0.9] text-[15px]'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                </div>

                {/* Trending/ what's happening */}
                <div className='w-full rounded-xl flex flex-col gap-2 bg-[#16181c] p-3'>
                    <p className='font-bold text-white text-xl'>What’s happening</p>
                    {
                        // TODO: 
                        // map
                        // get data from backend'
                    }
                </div>

            </div>
        </div>
    )
}

export default TrendingSidebar;
