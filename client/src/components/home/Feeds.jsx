import React, { useState } from 'react'

const Feeds = () => {

    const navLinks = [
        "For you",
        "Following",
    ];


    const [option, setOption] = useState(navLinks[0]);


    return (
        <div className='w-full'>
            <div className='flex flex-col  justify-start items-center bg-black'>

                {/* navbar */}
                <div className='flex flex-row justify-between w-full border-b-2 border-[white]/[0.19]'>
                    {
                        navLinks?.map((navlink, index) => (
                            <div
                                key={index}
                                className='flex w-full hover:bg-[white]/[0.1] cursor-pointer justify-center items-center flex-row gap-2'
                                onClick={() => {
                                    setOption(navlink)
                                }}
                            >
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className={` ${option === navlink ? "text-white font-bold" : "text-[white]/[0.4] font-semibold"} `}>{navlink}</p>
                                    <span className={`bg-blue-400 w-full h-1 rounded-full ${option === navlink ? "block" : "hidden"} `} />
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}

export default Feeds