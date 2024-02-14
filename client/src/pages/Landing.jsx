import React from 'react'
import xLogo from "/logo.png"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='w-screen flex flex-col justify-center items-center min-h-screen'>
                {/* section for landing page */}
                <div className='w-full flex flex-row justify-around items-center h-full'>

                    {/* part for logo */}
                    <div>
                        <div className='w-[300px]'>
                            <img className='w-full h-auto object-contain' src={xLogo} alt="X-logo" />
                        </div>
                    </div>

                    {/* part for signup | intro-heading */}
                    <div className='text-white flex flex-col gap-10'>

                        <div className='flex flex-col gap-14'>
                            <div>
                                <p className='text-7xl font-bold'>Happening now</p>
                            </div>
                            <div>
                                <p className='text-4xl font-bold'>Join today.</p>
                            </div>

                        </div>


                        <div className='flex flex-col w-[300px] gap-14 justify-start items-start'>

                            {/* signup options*/}
                            <div className='flex w-full flex-col gap-2 justify-start items-start'>

                                {/* google */}
                                <button className='flex font-semibold rounded-full py-2 px-5 w-full text-black bg-white justify-center items-center gap-2'>
                                    <FcGoogle className='text-xl' />
                                    <span>Signup with Google</span>
                                </button>

                                {/* apple */}
                                <button className='flex font-semibold rounded-full py-2 px-5 w-full text-black bg-white justify-center items-center gap-2'>
                                    <FaApple className='text-xl' />
                                    <span>Signup with Apple</span>
                                </button>

                                <div className='w-full gap-1 flex justify-center items-center'>
                                    <div className='h-[1px] w-full bg-[white]/[0.2]'></div>
                                    <div className='text-white'>or</div>
                                    <div className='h-[1px] w-full bg-[white]/[0.2]'></div>
                                </div>

                                {/* create account */}
                                <button
                                    onClick={() => {
                                        navigate("/auth-signup");
                                    }}
                                    className='flex font-semibold rounded-full py-2 px-5 w-full text-white bg-blue-400 hover:bg-blue-500 transition-all duration-300 ease-in-out justify-center items-center gap-2'>
                                    <span>Create account</span>
                                </button>

                                <div>
                                    <p className='text-xs text-[white]/[0.5] '>By signing up, you agree to the <span className='text-blue-400 cursor-pointer hover:underline'>Terms of Service</span> and <span className='text-blue-400 cursor-pointer hover:underline'>Privacy Policy</span>, including <span className='text-blue-400 cursor-pointer hover:underline'>Cookie Use</span>.</p>
                                </div>

                            </div>

                            {/* login */}
                            <div className='w-full flex flex-col gap-4 justify-start items-start'>
                                <p className='font-semibold text-lg'>Already have an account?</p>
                                {/* login account */}
                                <button onClick={() => {
                                    navigate("/auth-login");
                                }}
                                    className='flex font-semibold rounded-full py-2 px-5 w-full bg-black border-2 border-[white]/[0.25] text-blue-400 hover:border-[white]/[0.3] transition-all duration-300 ease-in-out justify-center items-center gap-2'>
                                    <span>Sign in</span>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

                {/* footer */}
                <div>

                </div>

            </div>
        </div>
    )
}

export default Landing