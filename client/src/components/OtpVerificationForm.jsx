import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"


const OtpVerificationForm = () => {

    const { register, handleSubmit } = useForm();

    const [timer, setTimer] = useState(30);

    const { pathname } = useLocation();

    const otp = ["", "", "", "", ""];

    useEffect(() => {
        setTimeout(() => {
            changeTime(timer - 1);
        }, 1000);
    }, [pathname]);


    function changeTime(time) {
        if (time >= 0) {
            setTimer(time)
            setTimeout(() => {
                changeTime(time - 1);
            }, 1000)
        }
    }


    const onSumbit = (data) => {
        console.log(data)
    }

    function resendOtpHandler() {

    }


    return (
        <div
            className='flex  flex-col justify-center items-center gap-16'
        >

            <form
                className='flex flex-row gap-10 justify-center items-center'
            >
                {/* input fields */}
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
            </form >

            {/* buttons */}
            < div className='w-full flex justify-between items-center' >
                {/* resend otp */}
                <div>

                    {
                        timer > 0 ? (
                            <p
                                className=' text-sm font-semibold text-blue-500'
                            >Send otp after:  <span>{timer}</span>
                            </p>

                        ) : (

                            <button
                                onClick={resendOtpHandler}
                                className='text-base font-semibold text-blue-500 hover:underline transition-all duration-300 ease-in-out'
                            >
                                Resend OTP
                            </button>

                        )
                    }

                </div >

                {/* verfiy otp */}
                <button
                    onClick={handleSubmit(onSumbit)}
                    className='text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out rounded-lg px-20 py-3 font-bold text-lg'
                >
                    Verify
                </button >

            </div >
        </div >
    )
}

export default OtpVerificationForm