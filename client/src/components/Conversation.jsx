import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { getUserDataById } from "../services/userService.js";

const Conversation = ({ data, currentUserId }) => {

    console.log(data)

    const [user, setUser] = useState(null);

    useEffect(() => {

        const userId = data.users?.find((id) => id != currentUserId);

        getUserDataById(userId)
            .then((res) => {
                console.log(res.data.data)
                setUser(res.data.data);

            }).catch((err) => {
                console.log("ERROR: ", err)
            });

    }, []);


    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(`/profile/${user.userName}`)}
            className='flex cursor-pointer w-full hover:bg-white/[0.1] transition-all duration-300 ease-in-out justify-start gap-3 p-2 items-center'
        >
            {/* user-image */}
            <div className='h-12 w-12 ml-2'>
                <img src={user?.profileImg} className=' w-full h-full object-contain rounded-full' alt="user-profile" />
            </div>

            {/* user name */}
            <div className='flex flex-col text-white justify-start items-start'>
                <p className='font-bold'>{user?.fullName}</p>
                <p className='text-white/[0.5] font-light'>@{user?.userName}</p>
            </div>

        </button>
    )
}

export default Conversation;