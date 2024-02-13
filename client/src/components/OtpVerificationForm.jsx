import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";


const OtpVerificationForm = () => {

    const { register, handleSubmit } = useForm();

    const otp = ["", "", "", "", ""];


    const onSumbit = (data) => {
        console.log(data)
    }


    return (
        <div>
            <form
                onSubmit={handleSubmit(onSumbit)}
                className='flex  flex-col justify-center items-center gap-16'
            >
                <div
                    className='flex flex-row gap-10 justify-center items-center'
                >
                    {
                        otp.map((value, index) => (
                            <input
                                type='text'
                                key={index}
                                name={`otp${index}`}
                                {
                                ...register(
                                    `otp${index}`,
                                    {
                                        required: "Enter Valid OTP",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            mesage: "Enter Valid OTP"
                                        }
                                    }
                                )
                                }

                                className=' w-14 p-5 h-14 transition-all duration-300 ease-in-out focus-within:border-blue-500 border-2 border-black text-white bg-[black] text-xl font-bold rounded-lg outline-none '
                            />
                        ))
                    }

                </div>


                <div>
                    <button type='submit' className='text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out rounded-lg px-20 py-3 font-bold text-lg'>Verify</button>
                </div>

            </form>
        </div>
    )
}

export default OtpVerificationForm