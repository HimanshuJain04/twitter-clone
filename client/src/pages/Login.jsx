import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form"
import xLogo from "/logo.png"
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom"

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        alert("API_CALLING : ", data);
    };

    return (
        <FormProvider
            {...register}
        >
            <div className='min-h-screen justify-center px-10  py-20 flex items-center bg-black w-screen'
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex justify-start w-[400px]  text-[white]/[0.4] items-center flex-col gap-7'
                >

                    <div className='w-[30px]'>
                        <img src={xLogo} className='' alt="x-logo" />
                    </div>

                    <div className='w-full my-5'>
                        <p className='text-3xl text-center text-white font-bold'>Welcome Back!</p>
                    </div>

                    {/* username or email */}
                    <div className='w-full'>
                        <input
                            type="text"
                            name='emailOrUsername'
                            {
                            ...register("emailOrUsername",
                                {
                                    required: "Username or Email is required",
                                }
                            )
                            }
                            placeholder='Enter your username or email'
                            className='bg-black text-white w-full text-xl placeholder:text-white/[0.4] transition-all duration-200 ease-in-out focus-within:border-blue-500 outline-none px-3 py-3 rounded-md border-2 border-gray-800'
                        />
                        {
                            errors.emailOrUsername &&
                            <p className='text-red-600 mt-2 text-sm font-bold'>{errors.emailOrUsername?.message}</p>
                        }
                    </div>

                    {/* password */}
                    <div className='w-full '>
                        <div className='relative'>
                            <input
                                type={showPass ? "text" : "password"}
                                name='password'
                                {
                                ...register("password",
                                    {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password should be at-least 6 characters"
                                        }
                                    }
                                )
                                }
                                placeholder='Enter your password'
                                className='bg-black text-white w-full text-xl placeholder:text-white/[0.4] transition-all duration-200 ease-in-out focus-within:border-blue-500 outline-none px-3 py-3 rounded-md border-2 border-gray-800'
                            />

                            {/* eye */}
                            <button
                                onClick={() => {
                                    setShowPass(!showPass)
                                }}
                                className=' text-lg absolute right-4 top-[50%] -translate-y-[50%]'
                            >
                                {
                                    showPass ? <FiEyeOff /> : <FiEye />
                                }
                            </button>

                        </div>

                        {/* error mesage */}
                        {
                            errors.password &&
                            <p className='text-red-600 mt-2 text-sm font-bold'>{errors.password?.message}</p>
                        }
                    </div>

                    {/* button */}
                    <div className='w-full mt-5'>
                        <button
                            type='submit'
                            className='bg-black hover:bg-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 w-full text-lg  font-semibold py-2 rounded-full text-white border-2 border-gray-500'
                        >
                            Login
                        </button>
                    </div>

                    <div className='flex flex-col gap-2 mt-5 justify-center items-center'>
                        <p className='text-lg font-semibold text-white'>If you haven't an account</p>
                        <Link
                            to="/signup"
                            className="text-blue-500  hover:underline"
                        >Signup</Link>
                    </div>


                </form>

            </div>


        </FormProvider>
    )
}

export default Login