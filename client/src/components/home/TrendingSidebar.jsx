import React from 'react'
import { FiSearch } from "react-icons/fi";


const TrendingSidebar = () => {
    return (
        <div>
            <div className='flex flex-col w-[380px] pl-10 pt-2 min-h-screen border-l-2 border-[white]/[0.15] justify-start items-start gap-5'>

                {/* searchbar */}
                <div className='flex w-full justify-center group focus-within:border-blue-500 transition-all duration-200 ease-in-out border-2 border-transparent  items-center gap-2 bg-[#202327] rounded-full px-3'>

                    <span className='text-[white]/[0.2] group-focus-within:text-blue-500 text-lg'>
                        <FiSearch />
                    </span>

                    <input
                        type="text"
                        placeholder='Search'
                        className='bg-transparent outline-none w-full  px-1 py-2  text-white placeholder:text-[white]/[0.3]'
                    />

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
                        // get dat from backend'
                    }
                </div>


            </div>
        </div>
    )
}

export default TrendingSidebar