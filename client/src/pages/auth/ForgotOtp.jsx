import React from 'react';
import OtpVerificationForm from "../../components/OtpVerificationForm";



const ForgotOtp = () => {



    return (
        <div className='min-h-screen w-full bg-black flex justify-center items-center'>

            <div className='flex flex-col bg-[white]/[0.09] shadow-lg shadow-[white]/[0.2] px-10 py-20 rounded-lg justify-center items-center gap-14'>

                {/* details/description */}
                <div className='flex flex-col justify-center items-center gap-5'>
                    <p className='text-white text-4xl font-bold'>Verify OTP</p>
                    <p className='text-[white]/[0.5] max-w-[500px] text-center font-semibold text-base'>To verify your OTP (One-Time-Password), Please enter 5 digits otp code that has been sent to your email address.</p>
                </div>

                {/* form */}
                <div>
                    <OtpVerificationForm />
                </div>

            </div>
        </div>
    )
}

export default ForgotOtp;