import React from 'react';
import OtpVerificationForm from "../components/OtpVerificationForm";


const VerifyOtp = () => {
    return (
        <div className='min-h-screen w-full bg-black flex justify-center items-center'>

            <div className='flex flex-col justify-center items-center gap-10'>
                {/* details/description */}
                <div>

                </div>

                {/* form */}
                <OtpVerificationForm />

            </div>
        </div>
    )
}

export default VerifyOtp