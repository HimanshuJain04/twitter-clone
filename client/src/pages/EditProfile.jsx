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
import { MdOutlinePhotoCameraFront } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"
import { updateUserDetails, getUserDetailsByUsername } from "../services/userService.js"
import Spinner from "../components/common/Spinner.jsx";

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
    const navigate = useNavigate();
    const { pathname } = useLocation();


    const [userCurrentState, setUserCurrentState] = useState(
        {
            userName: "",
            fullName: "",
            email: "",
            profileImg: "",
            gender: "",
            bio: "",
            phoneNo: "",
            dob: "",
            link: "",
            city: "",
        }
    );

    async function fetchUserData() {
        setLoading(true);
        const username = pathname.split("/").at(-1);

        await getUserDetailsByUsername(username)
            .then(({ data }) => {
                setUserCurrentState(
                    {
                        userName: data.data.existedUser?.userName,
                        fullName: data.data.existedUser?.fullName,
                        email: data.data.existedUser?.email,
                        profileImg: data.data.existedUser?.profileImg,
                        gender: data.data.existedUser?.additionalDetails.gender,
                        bio: data.data.existedUser?.additionalDetails.bio,
                        phoneNo: data.data.existedUser?.additionalDetails.phoneNo,
                        dob: data.data.existedUser?.additionalDetails.dob,
                        link: data.data.existedUser?.additionalDetails.link,
                        city: data.data.existedUser?.additionalDetails.city,
                    }
                )
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        fetchUserData();
    }, []);

    function changeHandler(e) {
        setUserCurrentState(
            {
                ...userCurrentState,
                [e.target.name]: e.target.value
            }
        )
    }

    async function updateHandler() {

        setLoading(true);

        const updatedValues = {};

        Object.entries(userCurrentState).forEach(([key, value]) => {
            if (userCurrentState[key] !== state[key] && userCurrentState[key] !== null) {
                updatedValues[key] = value;
            }
        });

        await updateUserDetails(updatedValues)
            .then(({ data }) => {
                navigate(`/profile/${state.userName}`)
                console.log(data)
            })
            .catch((error) => {
                console.log("ERROR : ", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }


    return (
        <div className='w-full'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='w-full overflow-auto pb-20 p-10 gap-16 h-screen flex flex-col items-center '>

                        {/* profile image */}
                        <div onClick={() => inputRef.current.click()} className='w-[200px] relative flex cursor-pointer group justify-center items-center overflow-hidden shrink-0 h-[200px] rounded-full bg-gray-600'>
                            <img
                                src={userCurrentState.profileImg}
                                alt="profile-image"
                                className=' w-full h-full object-cover'
                            />
                            <input type="file" hidden ref={inputRef} />

                            <div className="w-full opacity-0 h-full bg-black -bottom-[200px] flex text-center justify-center items-center text-5xl transition-all duration-700 ease-in-out text-white  group-hover:bottom-0 group-hover:opacity-80 object-cover absolute z-[5]  ">
                                <MdOutlinePhotoCameraFront />
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
                                onClick={updateHandler}
                            >
                                Update Changes
                            </button>
                        </div>


                    </div>
                )
            }

        </div >
    )
}


export default EditProfile;