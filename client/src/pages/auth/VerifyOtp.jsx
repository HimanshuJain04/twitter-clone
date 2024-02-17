import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import {
    verifyOtp,
    sendOtpToEmail
} from "../../services/authService.js"
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner.jsx";


const VerifyOtp = () => {

    const { register, handleSubmit } = useForm();

    const [timer, setTimer] = useState(1);

    const { pathname, } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state;

    const otp = ["", "", "", "", ""];

    const [isLoading, setIsLoading] = useState(false);

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


    const onSumbit = async (data) => {

        setIsLoading(true);

        const otp = Object.values(data).join("");


        await verifyOtp({ otp, email })
            .then(() => {
                toast.success("Otp verified successfully!");
                navigate("/auth-login");
            }).catch((err) => {
                toast.error(err?.response?.data?.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }


    async function resendOtpHandler() {

        setIsLoading(true);

        await sendOtpToEmail(email)
            .then(() => {
                toast.success("Otp resend!");
                changeTime(1);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <>
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    <div className='min-h-screen w-full bg-black flex justify-center items-center'>

                        <div className='flex flex-col bg-[white]/[0.09] shadow-lg shadow-[white]/[0.2] px-10 py-20 rounded-lg justify-center items-center gap-14'>

                            {/* details/description */}
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='text-white text-4xl font-bold'>Verify OTP</p>
                                <p className='text-[white]/[0.5] max-w-[500px] text-center font-semibold text-base'>To verify your OTP (One-Time-Password), Please enter 5 digits otp code that has been sent to your email address.</p>
                            </div>

                            {/* form */}
                            <div>
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
                                                    maxLength={1}
                                                    minLength={1}
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
                            </div>

                        </div>
                    </div>
                )
            }
        </>


    )
}

export default VerifyOtp;