import React from 'react';
import { useForm } from "react-hook-form";


const OtpVerificationForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

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
                                type='number'
                                key={index}
                                name={`otp${index}`}
                                {
                                ...register(
                                    `otp${index}`,
                                    {
                                        required: true,
                                    }
                                )
                                }

                                className=' w-12 p-5 h-12  text-xl font-bold rounded-lg outline-none '

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