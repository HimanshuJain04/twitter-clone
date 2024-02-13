import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { IoMail } from "react-icons/io5";

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const sumbitHandler = (data) => {
        console.log(data)
    }


    return (
        <div className='min-h-screen w-full bg-black flex justify-center items-center'>
            <div className='bg-[white]/[0.09] flex flex-col justify-center items-center gap-4 rounded-xl px-10 py-14 shadow-xl shadow-[white]/[0.15]'>


                <p className='text-white text-4xl font-bold'>Forgot Password</p>
                <p className='text-[white]/[0.5] font-semibold text-lg'>Enter email for verification code</p>

                <div className='w-full my-5'>
                    <div className=' placeholder:text-[white]/[0.45] focus-within:border-blue-500 border-2 border-[white]/[0.18] rounded-md flex gap-2 justify-center px-3 items-center text-white font-semibold bg-black w-[400px]'
                    >

                        <IoMail className='text-[white]/[0.5] text-2xl ' />
                        <input
                            type="email"
                            required
                            name='email'
                            {...register(
                                "email",
                                {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Please enter valid email address"
                                    }
                                }
                            )
                            }
                            placeholder='Enter email address'
                            className='w-full text-xl outline-none bg-transparent py-3 px-3'
                        />
                    </div>

                    {
                        errors.email &&
                        <p className='text-red-500 text-sm font-bold mt-2'>{errors.email?.message}</p>
                    }
                </div>

                <div className='mt-5'>
                    <button onClick={handleSubmit(sumbitHandler)} className='text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out rounded-lg px-20 py-3 font-bold text-lg'>Send OTP</button>
                </div>

                <div className='flex gap-1 justify-center items-center'>

                    <p className='text-[white]/[0.7] font-semibold text-lg'>Don't have an account yet?</p>

                    <Link
                        className='text-blue-400 my-5 text-lg font-semibold hover:underline transition-all duration-300 ease-in-out'
                        to="/auth-signup"
                    >Register</Link>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword