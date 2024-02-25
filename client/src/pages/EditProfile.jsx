import React, { useEffect, useRef, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiLocationOutline } from "react-icons/ti";
import { MdOutlineDateRange } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { GrAccessibility } from "react-icons/gr";
import { CiCamera } from "react-icons/ci";
import { useLocation } from "react-router-dom"


const fields = [
    {
        name: "fullName",
        placeholder: "Enter your full name",
        type: "text",
        isReadOnly: false,
        icon: <FaRegUser />,
    },
    {
        name: "userName",
        placeholder: "Enter your user name",
        type: "text",
        isReadOnly: true,
        icon: <FiUser />,
    },
    {
        name: "email",
        placeholder: "Enter your email address",
        type: "email",
        isReadOnly: true,
        icon: <MdOutlineEmail />,
    },
    {
        name: "city",
        placeholder: "Enter your city",
        type: "text",
        isReadOnly: false,
        icon: <TiLocationOutline />,
    },
    {
        name: "link",
        placeholder: "Enter your link",
        type: "text",
        isReadOnly: false,
        icon: <TiAttachment />,
    },
    {
        name: "dob",
        placeholder: "Enter your date of birth",
        type: "date",
        isReadOnly: false,
        icon: <MdOutlineDateRange />,
    },
    {
        name: "gender",
        placeholder: "Enter your gender",
        type: "select",
        isReadOnly: false,
        icon: <GrAccessibility />,
    },
    {
        name: "phoneNo",
        placeholder: "Enter your phone number",
        type: "text",
        isReadOnly: false,
        icon: <MdOutlinePermPhoneMsg />,
    },
    {
        name: "bio",
        placeholder: "Enter your bio",
        type: "textarea",
        isReadOnly: false,
        icon: <BiMessageDetail />,
    },
];


const EditProfile = () => {

    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const location = useLocation();
    const { state } = location;

    const [userCurrentState, setUserCurrentState] = useState(
        {
            userName: state.userName,
            fullName: state.fullName,
            email: state.email,
            profileImg: state.profileImg,
            gender: state.additionalDetails.gender,
            bio: state.additionalDetails.bio,
            phoneNo: state.additionalDetails.phoneNo,
            dob: state.additionalDetails.dob,
            link: state.additionalDetails.link,
            city: state.additionalDetails.city,
        }
    );

    function changeHandler(e) {
        setUserCurrentState(
            {
                ...userCurrentState,
                [e.target.name]: e.target.value
            }
        )
    }


    return (
        <div className='w-full'>
            <div className='w-full overflow-auto pb-20 p-10 gap-16 h-screen flex flex-col items-center '>

                {/* profile image */}
                <div onClick={() => inputRef.current.click()} className='w-[200px] relative flex cursor-pointer group justify-center items-center overflow-hidden shrink-0 h-[200px] rounded-full bg-gray-600'>
                    <img
                        src={userCurrentState.profileImg}
                        alt="profile-image"
                        className=' w-full h-full object-cover'
                    />
                    <input type="file" hidden ref={inputRef} />

                    <div className="w-full h-full flex justify-center items-center text-9xl transition-all duration-200 ease-in-out text-black opacity-0 group-hover:opacity-30 object-cover absolute z-[5]  ">
                        <CiCamera />
                    </div>

                </div>

                <div className='flex justify-start items-start flex-col gap-7'>

                    {fields.map((field, index) => (
                        <div
                            key={field.name + index}
                            className=' bg-[white]/[0.1] pl-3 text-white rounded-lg flex justify-center transition-all duration-300 ease-in-out focus-within:border-blue-400 border-[2px] border-[white]/[0.05] gap-1 items-center shadow-md'
                        >
                            <label
                                htmlFor={field.name}
                                className='text-white pr-2 border-r-2 border-white/[0.4] text-3xl'
                            >
                                {
                                    field.icon
                                }
                            </label>

                            {
                                field.name === "bio" ? (
                                    <textarea
                                        name={field.name}
                                        value={userCurrentState[field.name]}
                                        id={field.name}
                                        onChange={changeHandler}
                                        placeholder={field.placeholder}
                                        className={`outline-none placeholder:text-gray-400 resize-none min-h-[150px] w-[350px] p-3 text-white  bg-transparent text-lg font-semibold`}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={userCurrentState[field.name]}
                                        id={field.name}
                                        onChange={changeHandler}
                                        readOnly={field.isReadOnly}
                                        placeholder={field.placeholder}
                                        className={`outline-none placeholder:text-gray-400 w-[350px] p-3 ${field.isReadOnly ? "text-white opacity-70" : "text-white"}  bg-transparent text-lg font-semibold`}
                                    />
                                )
                            }



                        </div>
                    ))}
                </div>

                <div>
                    <button
                        className='bg-blue-400 text-white font-semibold py-3 text-lg px-10 rounded-md '
                    >
                        Update Changes
                    </button>
                </div>


            </div>
        </div >
    )
}

export default EditProfile;